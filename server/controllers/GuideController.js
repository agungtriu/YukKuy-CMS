const models = require("../models");
const guide = models.guide;
class GuideController {
  static async getGuideByAccountId(req, res) {
    try {
      const accountId = +req.accountData.id;
      const result = await guide.findAll({ where: { accountId }, order: [["createdAt", "ASC"]] });
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
  static async getGuideById(req, res) {
    try {
      const id = req.params.id;
      const result = await guide.findOne({ where: { id } });
      if (result !== null) {
        res.status(200).json({
          status: true,
          data: result,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "guide not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async addGuide(req, res) {
    try {
      const { name, phone } = req.body;
      const accountId = req.accountData.id;
      const result = await guide.create({
        name,
        phone,
        accountId,
      });

      if (result !== null) {
        res.status(201).json({
          status: true,
          message: `guide has been added!`,
          data: result,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "guide failed to add!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async editGuide(req, res) {
    try {
      const id = +req.params.id;
      const { name, phone } = req.body;
      const result = await guide.update(
        {
          name,
          phone,
        },
        { where: { id } }
      );

      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: "update guide successful",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "update guide unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async deleteGuide(req, res) {
    try {
      const id = +req.params.id;
      const result = await guide.destroy({ where: { id } });
      if (result === 1) {
        res.status(201).json({
          status: true,
          message: "delete guide successful",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "delete guide unsuccessful",
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
module.exports = GuideController;
