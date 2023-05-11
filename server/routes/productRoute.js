const { ProductController } = require("../controllers");
const { auth, upload } = require("../middlewares");
const productRoutes = require("express").Router();

productRoutes.get("/cms", auth, ProductController.getProductsCMS);
productRoutes.get("/cms/detail/:id", ProductController.getProductCMS);
productRoutes.get("/city", ProductController.getCity);
productRoutes.get("/mobile", ProductController.getProductsMobile);
productRoutes.get("/mobile/detail/:id", ProductController.getProductMobile);
productRoutes.get("/search", ProductController.searchProductsbyKey);
productRoutes.post(
  "/add",
  auth,
  upload.array("images"),
  ProductController.addProduct
);
productRoutes.put(
  "/edit/:id",
  auth,
  upload.array("images"),
  ProductController.editProduct
);
productRoutes.put("/show/:id", auth, ProductController.showProduct);

module.exports = productRoutes;
