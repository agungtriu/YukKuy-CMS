const { ProductController } = require("../controllers");
const { auth, upload } = require("../middlewares");
const productRoutes = require("express").Router();

productRoutes.get("/cms", auth, ProductController.getProductsCMS);
productRoutes.get("/cms/detail/:id", ProductController.getProductCMS);
productRoutes.get("/city", ProductController.getCity);
productRoutes.get("/mobile", ProductController.getProductsMobile);
productRoutes.get("/mobile/detail/:id", ProductController.getProductMobile);
productRoutes.get("/search", ProductController.searchProductsByKey);
productRoutes.post(
  "/add",
  auth,
  upload.array("images"),
  ProductController.addProduct
);
productRoutes.put(
  "/edit/image/:id",
  auth,
  upload.array("images"),
  ProductController.editProductWithImage
);
productRoutes.put("/edit/:id", auth, ProductController.editProduct);
productRoutes.put("/show/:id", auth, ProductController.showProduct);
productRoutes.get("/delete/:id", auth, ProductController.deleteProduct);

module.exports = productRoutes;
