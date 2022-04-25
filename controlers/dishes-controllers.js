const DishesModel = require("../models/dishes-models");
const dishesModel = new DishesModel();

class DishesController {
    fetchAllDishes() {
        return dishesModel.getAllDishes();
    }
    fetchDishesById(dishId) {
        return dishesModel.getDishesById(dishId);
    }
    postDishItem(dishObj) {
        return dishesModel.createNewDish(dishObj);
    }
    updateDishItem(dishId,updatedObj){
        return dishesModel.putDishItem(dishId,updatedObj);
    }
    deleteDishItem(dishId){
        return dishesModel.deleteDishItem(dishId);
    }
};

module.exports = DishesController;