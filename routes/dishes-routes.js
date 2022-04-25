const router = require("express").Router();
const DishesController = require("../controlers/dishes-controllers");

const dishesController = new DishesController();

const {
    validateAuthenticatedSession,
    validateAdminSession
} = require("../utilities/session-validator");

router.get("/:id?", validateAuthenticatedSession, (req, res) => {
    const dishId = req.params.id;
    if (dishId) {
        dishesController
            .fetchDishesById(dishId)
            .then(dish => res.status(200).json(dish))
            .catch(err => res.status(400).json(err))
    } else {
        dishesController
            .fetchAllDishes()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(400).json(err));
    }
});

router.post("/add", validateAdminSession, (req, res) => {
    const newDish = req.body;
    dishesController
        .postDishItem(newDish)
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json(err));
});

router.put("/:id/update", validateAdminSession, (req, res) => {
    const dishId = req.params.id;
    const updates = req.body;
    if (updates) {
        dishesController
            .updateDishItem(dishId, updates)
            .then(response => res.status(200).json(response))
            .catch(err => res.status(400).json(err));
    } else {
        res.status(400).json({ message: "No req body found" })
    };
});

router.delete("/:id", validateAdminSession, (req, res) => {
    const dishId = req.params.id;
    dishesController
        .deleteDishItem(dishId)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err))
});

module.exports = router;