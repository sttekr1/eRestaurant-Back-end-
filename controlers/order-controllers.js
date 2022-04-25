const OrdersModel = require("../models/orders-models");
const orderModel = new OrdersModel();

class OrdersController {
    fetchAllOrders() {
        return orderModel.getAllOrders();
    }
    fetchOrdersById(orderId) {
        return orderModel.getOrdersById(orderId);
    }
    postOrderItem(orderObj) {
        return orderModel.createNewOrder(orderObj);
    }
    updateOrderItem(orderId, updatedObj) {
        return orderModel.putOrderItem(orderId, updatedObj);
    }
    patchOrderStatus(orderId, status) {
        return orderModel.patchOrderStatus(orderId, status);
    }
    deleteOrderItem(orderId) {
        return orderModel.deleteOrderItem(orderId);
    }
};

module.exports = OrdersController;