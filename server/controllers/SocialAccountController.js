const models = require("../models");
const socialAccount = models.socialAccount;
class SocialAccountController {
  static async getSocialAccountsByAccountId(req, res) {
    try {
      const accountId = req.params.accountId;
      const result = await socialAccount.findAll({ where: { accountId } });
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
  static async getSocialAccountById(req, res) {
    try {
      const id = req.params.id;
      const result = await socialAccount.findOne({ where: { id } });
      if (result !== null) {
        res.status(200).json({
          status: true,
          data: result,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "social account not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async addSocialAccount(req, res) {
    try {
      const { platform, link } = req.body;
      const accountId = req.accountData.id;
      const result = await socialAccount.create({
        platform,
        link,
        accountId,
      });

      if (result !== null) {
        res.status(201).json({
          status: true,
          message: `social account has been added!`,
          data: result,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "social account failed to add!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async editSocialAccount(req, res) {
    try {
      const id = +req.params.id;
      const { platform, link } = req.body;
      const result = await socialAccount.update(
        {
          platform,
          link,
        },
        { where: { id } }
      );

      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: "update social account successful",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "update social account unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async deleteSocialAccount(req, res) {
    try {
      const id = +req.params.id;
      const result = await socialAccount.destroy({ where: { id } });
      if (result === 1) {
        res.status(201).json({
          status: true,
          message: "delete social account successful",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "delete social account unsuccessful",
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
module.exports = SocialAccountController;
