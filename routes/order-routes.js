const router = require("express").Router();
const OrdersController = require("../controlers/order-controllers");

const ordersController = new OrdersController();

const {
    validateAuthenticatedSession,
    validateAdminSession
} = require("../utilities/session-validator");

const { orderValidator } = require("../utilities/order-validator");

router.get("/:id?", validateAdminSession, async (req, res) => {
    const orderId = req.params.id;
    try {
        if (!orderId) {
            const orders = await ordersController.fetchAllOrders();
            res.send(orders);
        } else {
            const orders = await ordersController.fetchOrdersById(orderId);
            res.send(orders)
        }
    } catch (error) {
        res.send(error);
    }
});

router.post("/add", validateAuthenticatedSession, orderValidator, async (req, res) => {
    const newOrder = req.body;
    try {
        const orders = await ordersController.postOrderItem(newOrder);
        res.send(orders);
    } catch (error) {
        res.send(error);
    }
});

router.patch("/:id/:status", validateAdminSession, async (req, res) => {
    const orderId = req.params.id;
    const updatedStatus = req.params.status;
    try {
        const orders = await ordersController.patchOrderStatus(orderId, updatedStatus);
        res.send(orders);
    } catch (error) {
        res.send(error);
    }
});

router.put("/:id/update", validateAdminSession, async (req, res) => {
    const orderId = req.params.id;
    const updates = req.body;
    try {
        const orders = await ordersController.updateOrderItem(orderId, updates);
        res.send(orders);
    } catch (error) {
        res.send(error);
    }
});

router.delete("/:id", validateAdminSession, async (req, res) => {
    const orderId = req.params.id;
    try {
        const orders = await ordersController.deleteOrderItem(orderId);
        res.send(orders);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;