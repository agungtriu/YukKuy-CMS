const { OrderController } = require("../controllers");
const { auth } = require("../middlewares");
const orderRoutes = require("express").Router();

orderRoutes.get("/cms", auth, OrderController.getOrdersCMS);
orderRoutes.get("/mobile", auth, OrderController.getOrdersMobile);
orderRoutes.get("/:id", OrderController.getOrder);
orderRoutes.post("/add", auth, OrderController.addOrder);

orderRoutes.post("/notification", OrderController.notificationMidtrains)

module.exports = orderRoutes;
