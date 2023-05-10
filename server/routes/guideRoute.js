const { GuideController } = require("../controllers");
const { auth } = require("../middlewares");
const guideRoutes = require("express").Router();

guideRoutes.get("/", auth, GuideController.getGuideByAccountId);
guideRoutes.get("/:id", auth, GuideController.getGuideById);
guideRoutes.post("/add", auth, GuideController.addGuide);
guideRoutes.put("/edit/:id", auth, GuideController.editGuide);
guideRoutes.get("/delete/:id", auth, GuideController.deleteGuide);

module.exports = guideRoutes;
