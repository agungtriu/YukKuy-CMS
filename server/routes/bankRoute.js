const { BankController } = require("../controllers");
const { auth } = require("../middlewares");
const bankRoutes = require("express").Router();

bankRoutes.get("/:accountId", BankController.getBanksByAccountId);
bankRoutes.get("/detail/:id", BankController.getBankById);
bankRoutes.post("/add", auth, BankController.addBank);
bankRoutes.put("/edit/:id", auth, BankController.editBank);
bankRoutes.get("/delete/:id", auth, BankController.deleteBank);

module.exports = bankRoutes;
