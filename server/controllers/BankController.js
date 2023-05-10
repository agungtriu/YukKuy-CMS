const models = require("../models");
const bank = models.bank;
class BankController {
  static async getBanksByAccountId(req, res) {
    try {
      const accountId = req.params.accountId;
      const result = await bank.findAll({ where: { accountId } });
      res.status(200).json({
        status: true,
        count: result.length,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async getBankById(req, res) {
    try {
      const id = req.params.id;
      const result = await bank.findOne({ where: { id } });
      if (result !== null) {
        res.status(200).json({
          status: true,
          data: result,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "bank not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async addBank(req, res) {
    try {
      const { nameBank, name, number } = req.body;
      const accountId = +req.accountData.id;
      const result = await bank.create({
        bank: nameBank,
        name,
        number,
        accountId,
      });

      if (result !== null) {
        res.status(201).json({
          status: true,
          message: `bank has been added!`,
          data: result,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "bank failed to add!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async editBank(req, res) {
    try {
      const id = req.params.id;
      const { nameBank, name, number } = req.body;
      const result = await bank.update(
        {
          bank: nameBank,
          name,
          number,
        },
        { where: { id } }
      );

      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: "update bank successful",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "update bank unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async deleteBank(req, res) {
    try {
      const id = +req.params.id;
      const result = await bank.destroy({ where: { id } });
      if (result === 1) {
        res.status(201).json({
          status: true,
          message: "delete bank successful",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "delete bank unsuccessful",
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
module.exports = BankController;
