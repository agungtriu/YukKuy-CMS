const { OrderController } = require("../controllers");
const { auth } = require("../middlewares");
const verificationRoutes = require("./verificationRoute");
const orderRoutes = require("express").Router();

orderRoutes.get("/cms", auth, OrderController.getOrdersCMS);
orderRoutes.get("/mobile", auth, OrderController.getOrdersMobile);
orderRoutes.get("/:id", OrderController.getOrder);
orderRoutes.post("/add", auth, OrderController.addOrder);
orderRoutes.put("/cancel/:id", auth, OrderController.cancelOrder);

orderRoutes.use("/verifications", verificationRoutes);

module.exports = orderRoutes;
