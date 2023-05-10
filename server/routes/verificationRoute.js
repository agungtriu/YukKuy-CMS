const { VerificationController } = require("../controllers");
const { auth, upload } = require("../middlewares");
const verificationRoutes = require("express").Router();

verificationRoutes.post(
  "/add",
  auth,
  upload.single("imageReceipt"),
  VerificationController.addVerification
);
verificationRoutes.put(
  "/accept/:id",
  auth,
  VerificationController.acceptVerification
);
verificationRoutes.put(
  "/reject/:id",
  auth,
  VerificationController.rejectVerification
);

module.exports = verificationRoutes;
