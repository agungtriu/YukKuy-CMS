const { WithdrawController } = require("../controllers");
const { auth } = require("../middlewares");
const withdrawRoutes = require("express").Router();

withdrawRoutes.get("/", auth, WithdrawController.getWithdraws);
withdrawRoutes.get("/:id", auth, WithdrawController.getWithdrawById);

withdrawRoutes.post("/add", auth, WithdrawController.addWithdraw);
withdrawRoutes.get("/process/:id", auth, WithdrawController.processWithdraw);
withdrawRoutes.get("/accept/:id", auth, WithdrawController.acceptWithdraw);
withdrawRoutes.put("/reject/:id", auth, WithdrawController.rejectWithdraw);
withdrawRoutes.get("/delete/:id", auth, WithdrawController.deleteWithdraw);

module.exports = withdrawRoutes;
