const { HomeCMSController } = require("../controllers");
const { auth, upload } = require("../middlewares");

const routes = require("express").Router();
routes.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "YukKuy",
  });
});

routes.get("/cms", auth, HomeCMSController.getHomeCMS);

const accountRoute = require("./accountRoute");
const guideRoutes = require("./guideRoute");
const orderRoutes = require("./orderRoute");
const productRoutes = require("./productRoute");

routes.use("/accounts", accountRoute);
routes.use("/guides", guideRoutes);
routes.use("/products", productRoutes);
routes.use("/orders", orderRoutes);

module.exports = routes;
