const orderValidator = (req, res, next) => {
    const dishName = req.body.dishName;
    //Check if dishName type is Array
    const isDishOrderArray = dishName instanceof Array;
    //Check if there are multiple dishes added as: dishName: "Chicken Soup, Beans Soup"
    //Split by ',' so we split the string to array
    //But as well we will check if isDishOrderArray is not array with !isDishPerOrderArray;
    const splittedDishName = !isDishOrderArray && dishName.split(",");
    //If the length of splittedDishName is more then 1, it means that there are multiple elements
    //which leads to there were multiple dishes oredered per order;
    const areThereMultipleDishesOrdered = splittedDishName.length > 1;

    if (isDishOrderArray) {
        return res.status(400).send({ message: "Bad request, dishName can't be an array" });
    }
    if (areThereMultipleDishesOrdered) {
        return res.status(400).send({
            message: "Bad request, you can't order multiple dishes per order"
        });
    }
    next();
};

module.exports = { orderValidator };