const { SocialAccountController } = require("../controllers");
const { auth } = require("../middlewares");
const socialAccountRoutes = require("express").Router();

socialAccountRoutes.get("/:accountId", SocialAccountController.getSocialAccountsByAccountId);
socialAccountRoutes.get("/detail/:id", SocialAccountController.getSocialAccountById);
socialAccountRoutes.post("/add", auth, SocialAccountController.addSocialAccount);
socialAccountRoutes.put("/edit/:id", auth, SocialAccountController.editSocialAccount);
socialAccountRoutes.get("/delete/:id", auth, SocialAccountController.deleteSocialAccount);

module.exports = socialAccountRoutes;
