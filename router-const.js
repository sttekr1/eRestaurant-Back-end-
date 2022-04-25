const router = require("express").Router();
const dishesRouter = require("./routes/dishes-routes");
const orderRoutes = require("./routes/order-routes");
const authRoutes = require("./routes/auth-route");

router.use("/dishes", dishesRouter);
router.use("/orders", orderRoutes);
router.use("/auth", authRoutes);

module.exports = router;