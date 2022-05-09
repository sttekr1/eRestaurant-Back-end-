const router = require("express").Router();
const DishesController = require("../controlers/dishes-controllers");

const dishesController = new DishesController();

const {
    validateAuthenticatedSession,
    validateAdminSession
} = require("../utilities/session-validator");

router.get("/:id?", validateAuthenticatedSession, async (req, res) => {
    const dishId = req.params.id;
    try {
        if (dishId) {
            const dishes = await dishesController.fetchDishesById(dishId);
            res.send(dishes);
        } else {
            const noIdDish = await dishesController.fetchAllDishes();
            res.send(noIdDish);
        }
    } catch (error) {
        res.send(error);
    }
});

router.post("/add", validateAdminSession, async (req, res) => {
    const newDish = req.body;
    try {
        const dishes = await dishesController.postDishItem(newDish);
        res.send(dishes);
    } catch (error) {
        res.send(error);
    }
});

router.put("/:id/update", validateAdminSession, async (req, res) => {
    const dishId = req.params.id;
    const updates = req.body;
    try {
        const dishes = await dishesController.updateDishItem(dishId, updates);
        res.send(dishes);
    } catch (error) {
        res.send(error);
    }
});

router.delete("/:id", validateAdminSession, async (req, res) => {
    const dishId = req.params.id;
    try {
        const dishes = await dishesController.deleteDishItem(dishId);
        res.send(dishes);
    } catch (error) {
        res.send(error);
    };
});

module.exports = router;