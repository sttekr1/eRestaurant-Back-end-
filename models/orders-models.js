const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const ordersPath = path.join(__dirname, "..", "db", "orders.json");

class OrdersModel {
    getAllOrders() {
        return new Promise((resolve, reject) => {
            const ordersData = fs.readFileSync(ordersPath, { encoding: "utf-8" });
            resolve(JSON.parse(ordersData))
        });
    };
    getOrdersById(orderId) {
        return new Promise((resolve, reject) => {
            const ordersData = JSON.parse(fs.readFileSync(ordersPath, { encoding: "utf-8" }));
            const foundOrder = ordersData.find(order => order.id === orderId);
            if (foundOrder) {
                resolve(foundOrder);
            } else (
                reject({ message: "No item with such ID" })
            )
        });
    };
    createNewOrder(orderObj) {
        return new Promise((resolve, reject) => {
            const ordersData = JSON.parse(fs.readFileSync(ordersPath, { encoding: "utf-8" }));
            const newOrder = { id: uuid(), ...orderObj };
            ordersData.push(newOrder);
            fs.writeFileSync(ordersPath, JSON.stringify(ordersData), err => {
                if (err) {
                    console.log(err);
                }
            });
            resolve({ message: "Dish added successfully" });
        });
    };
    putOrderItem(orderId, updatedObj) {
        return new Promise((resolve, reject) => {
            const ordersData = JSON.parse(fs.readFileSync(ordersPath, { encoding: "utf-8" }));
            ordersData.forEach(order => {
                if (order.id === orderId) {
                    order.dishName = updatedObj.dishName,
                    order.status = updatedObj.status
                };
            });
            fs.writeFileSync(ordersPath, JSON.stringify(ordersData));
            resolve({ message: "Dish added successfully" })
        })
    };
    patchOrderStatus(orderId, status) {
        return new Promise((resolve, reject) => {
            const ordersData = JSON.parse(fs.readFileSync(ordersPath, { encoding: "utf-8" }));
            ordersData.forEach(order => {
                if (order.id === orderId) {
                    order.status = status
                }
            });
            fs.writeFileSync(ordersPath, JSON.stringify(ordersData));
            resolve({ message: "Order status updated" })
        })
    }
    deleteOrderItem(orderId) {
        return new Promise((resolve, reject) => {
            const ordersData = JSON.parse(fs.readFileSync(ordersPath, { encoding: "utf-8" }));
            const filteredOrders = ordersData.filter(order => order.id !== orderId);
            fs.writeFileSync(ordersPath, JSON.stringify(filteredOrders));
            resolve({ message: "Dish deleted!" })
        });
    }
};

module.exports = OrdersModel;