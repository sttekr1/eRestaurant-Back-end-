const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const dishesPath = path.join(__dirname, "..", "db", "dishes.json");

class DishesModel {
    getAllDishes() {
        return new Promise((resolve, reject) => {
            const dishesData = fs.readFileSync(dishesPath, { encoding: "utf-8" });
            resolve(JSON.parse(dishesData));
            if (dishesData.length <= 0) {
                return reject({ message: "No dishes found" });
            }
        });
    };
    getDishesById(dishId) {
        return new Promise((resolve, reject) => {
            const dishData = JSON.parse(fs.readFileSync(dishesPath, { encoding: "utf-8" }));
            const foundDish = dishData.find(dish => dish.id === dishId);
            if (foundDish) {
                resolve(foundDish);
            } else (
                reject({ message: "No item with such ID" })
            )
        });
    };
    createNewDish(dishObj) {
        return new Promise((resolve, reject) => {
            const dishData = JSON.parse(fs.readFileSync(dishesPath, { encoding: "utf-8" }));
            if (dishObj.price < 1 || dishObj.price > 1000) {
                return reject({ message: "Dish price is not valid" });
            };
            const newDish = { id: uuid(), ...dishObj };
            dishData.push(newDish);
            fs.writeFileSync(dishesPath, JSON.stringify(dishData), err => {
                if (err) {
                    console.log(err);
                }
            });
            resolve({ message: "Dish added successfully" });
        });
    };
    putDishItem(dishId, updatedObj) {
        return new Promise((resolve, reject) => {
            const dishData = JSON.parse(fs.readFileSync(dishesPath, { encoding: "utf-8" }));
            if (updatedObj.price < 1 || updatedObj.price > 1000) {
                return reject({ message: "Dish price is not valid" });
            };
            dishData.forEach(dish => {
                if (dish.id === dishId) {
                    dish.name = updatedObj.name,
                    dish.price = updatedObj.price
                };
            });
            fs.writeFileSync(dishesPath, JSON.stringify(dishData));
            resolve({ message: "Dish added successfully" })
        })
    };
    deleteDishItem(dishId) {
        return new Promise((resolve, reject) => {
            const dishData = JSON.parse(fs.readFileSync(dishesPath, { encoding: "utf-8" }));
            const filteredDishes = dishData.filter(dish => dish.id !== dishId);
            fs.writeFileSync(dishesPath, JSON.stringify(filteredDishes));
            resolve({ message: "Dish deleted!" })
        });
    }
};

module.exports = DishesModel;