const router = require("express").Router();
const OrdersController = require("../controlers/order-controllers");

const ordersController = new OrdersController();

const {
    validateAuthenticatedSession,
    validateAdminSession
} = require("../utilities/session-validator");

const { orderValidator } = require("../utilities/order-validator");

router.get("/:id?", validateAdminSession, (req, res) => {
    const orderId = req.params.id;
    if (orderId) {
        ordersController
            .fetchOrdersById(orderId)
            .then(order => res.status(200).json(order))
            .catch(err => res.status(400).json(err))
    } else {
        ordersController
            .fetchAllOrders()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(400).json(err))
    };
});

router.post("/add", validateAuthenticatedSession, orderValidator, (req, res) => {
    const newOrder = req.body;
    ordersController
        .postOrderItem(newOrder)
        .then(response => res.status(201).json(response))
        .catch(err => res.status(400).json(err));
});

router.patch("/:id/:status", validateAdminSession, (req, res) => {
    const orderId = req.params.id;
    const updatedStatus = req.params.status;
    ordersController
        .patchOrderStatus(orderId, updatedStatus)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
});

router.put("/:id/update", validateAdminSession, (req, res) => {
    const orderId = req.params.id;
    const updates = req.body;
    if (updates) {
        ordersController
            .updateOrderItem(orderId, updates)
            .then(response => res.status(200).json(response))
            .catch(err => res.status(400).json(err));
    } else {
        res.status(400).json({ message: "No req body found" })
    };
});

router.delete("/:id", validateAdminSession, (req, res) => {
    const orderId = req.params.id;
    ordersController
        .deleteOrderItem(orderId)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err))
});

module.exports = router;