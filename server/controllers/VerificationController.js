const { where } = require("sequelize");
const models = require("../models");
const statusOrder = models.statusOrder;
const verificationPayment = models.verificationPayment;

class VerificationController {
  static async addVerification(req, res) {
    try {
      const { bankId, orderId } = req.body;
      const imageReceipt = req.file.filename;

      const resultVerification = await verificationPayment.create({
        orderId,
        bankId,
        imageReceipt,
      });

      if (resultVerification !== null) {
        await statusOrder.update(
          {
            status: "verification",
            reason: "",
          },
          { where: { orderId } }
        );

        res.status(201).json({
          status: true,
          message: "verification has been made",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "failed to made verification",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async acceptVerification(req, res) {
    try {
      const orderId = req.params.id;
      const result = await statusOrder.update(
        {
          status: "success",
          reason: "",
        },
        { where: { orderId } }
      );
      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: "verification has been accepted",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "failed to accept verification",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async rejectVerification(req, res) {
    try {
      const orderId = req.params.id;
      const { reason } = req.body;
      const result = await statusOrder.update(
        {
          status: "reject",
          reason,
        },
        { where: { orderId } }
      );
      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: "verification has been rejected",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "failed to reject verification",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
}

module.exports = VerificationController;
