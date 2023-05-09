const { AccountController } = require("../controllers");
const { auth, upload } = require("../middlewares");
const bankRoutes = require("./bankRoute");
const socialAccountRoutes = require("./socialAccountRoute");
const accountRoute = require("express").Router();

accountRoute.post("/cms/register", AccountController.registerCMS);
accountRoute.post("/cms/login", AccountController.loginCMS);

accountRoute.post("/mobile/register", AccountController.registerMobile);
accountRoute.post("/mobile/login", AccountController.loginMobile);

accountRoute.put("/edit/profile", auth, AccountController.editProfile);
accountRoute.put("/edit/password", auth, AccountController.editPassword);
accountRoute.put("/edit/avatar", auth, upload.single("avatar") , AccountController.editAvatar);
accountRoute.put("/edit/banner", auth, upload.single("banner"), AccountController.editBanner);

accountRoute.get("/:username", AccountController.getAccountByUsername);
accountRoute.get("/seller/:username", AccountController.getSellerByUsername);

accountRoute.use("/banks", bankRoutes);
accountRoute.use("/socialAccounts", socialAccountRoutes);

module.exports = accountRoute;
