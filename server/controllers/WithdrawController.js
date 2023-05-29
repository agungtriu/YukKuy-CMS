const { where } = require("sequelize");
const models = require("../models");
const withdraw = models.withdraw;
const statusWithdraw = models.statusWithdraw;
const account = models.account;
const bank = models.bank;

class WithdrawController {
  static async getWithdraws(req, res) {
    try {
      const accountId = +req.accountData.id;
      const status = req.query.status || "";
      const accountResponse = await account.findOne({
        where: { id: accountId },
      });
      let result = {};
      if (status === "") {
        if (accountResponse.role === "admin") {
          result = await withdraw.findAll({
            include: [statusWithdraw],
            order: [[statusWithdraw, "updatedAt", "DESC"]],
          });
        } else {
          result = await withdraw.findAll({
            where: { accountId },
            include: [statusWithdraw],
            order: [[statusWithdraw, "updatedAt", "DESC"]],
          });
        }
      } else {
        if (accountResponse.role === "admin") {
          result = await withdraw.findAll({
            include: [{ model: statusWithdraw, where: { status } }],
            order: [[statusWithdraw, "updatedAt", "DESC"]],
          });
        } else {
          result = await withdraw.findAll({
            where: { accountId },
            include: [{ model: statusWithdraw, where: { status } }],
            order: [[statusWithdraw, "updatedAt", "DESC"]],
          });
        }
      }
      const resultResponse = [];
      for (const item of result) {
        const accountResponse = await account.findOne({
          where: { id: item.accountId },
        });
        const bankResponse = await bank.findOne({ where: { id: item.bankId } });
        resultResponse.push({
          ...item.dataValues,
          account: accountResponse,
          bank: bankResponse,
        });
      }
      res.status(200).json({
        status: true,
        count: resultResponse.length,
        data: resultResponse,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async getWithdrawById(req, res) {
    try {
      const id = req.params.id;
      const result = await withdraw.findOne({ where: { id } });
      if (result !== null) {
        res.status(200).json({
          status: true,
          data: result,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "withdraw not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async addWithdraw(req, res) {
    try {
      const { amount, bankId } = req.body;
      const accountId = +req.accountData.id;
      const checkAccount = await account.findOne({
        where: { id: accountId },
      });
      if (+checkAccount.saldo >= +amount) {
        const result = await withdraw.create({
          amount,
          bankId,
          accountId,
        });

        if (result !== null) {
          await statusWithdraw.create({
            withdrawId: result.id,
          });

          res.status(201).json({
            status: true,
            message: `Withdraw has been added!`,
            data: result,
          });
        } else {
          res.status(400).json({
            status: false,
            message: "Withdraw failed to add!",
          });
        }
      } else {
        res.status(400).json({
          status: false,
          message: "saldo not enough",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async processWithdraw(req, res) {
    try {
      const id = +req.params.id || 0;
      const check = await withdraw.findOne({ where: { id } });
      const checkAccount = await account.findOne({
        where: { id: check.accountId },
      });
      if (check !== null) {
        if (checkAccount.saldo >= check.amount) {
          const remaining = +checkAccount.saldo - +check.amount;
          const updateSaldo = await account.update(
            {
              saldo: remaining,
            },
            { where: { id: check.accountId } }
          );
          if (updateSaldo[0] === 1) {
            await statusWithdraw.update(
              {
                status: "process",
                reason: "",
              },
              { where: { withdrawId: id } }
            );

            res.status(201).json({
              status: true,
              message: "withdraw processed",
            });
          } else {
            res.status(400).json({
              status: false,
              message: "update status withdraw unsuccessful",
            });
          }
        } else {
          res.status(400).json({
            status: false,
            message: "saldo not enough",
          });
        }
      } else {
        res.status(404).json({
          status: false,
          message: "withdraw not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async acceptWithdraw(req, res) {
    try {
      const id = +req.params.id || 0;
      const check = await withdraw.findOne({ where: { id } });
      if (check !== null) {
        const statusResponse = await statusWithdraw.update(
          {
            status: "success",
            reason: "",
          },
          { where: { withdrawId: id } }
        );
        if (statusResponse[0] === 1) {
          res.status(201).json({
            status: true,
            message: "withdraw success",
          });
        } else {
          res.status(400).json({
            status: false,
            message: "update status withdraw unsuccessful",
          });
        }
      } else {
        res.status(404).json({
          status: false,
          message: "withdraw not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async rejectWithdraw(req, res) {
    try {
      const id = +req.params.id || 0;
      const check = await withdraw.findOne({ where: { id } });
      const { reason } = req.body;
      if (check !== null) {
        const result = await statusWithdraw.update(
          {
            status: "reject",
            reason,
          },
          { where: { withdrawId: id } }
        );
        if (result[0] === 1) {
          res.status(201).json({
            status: true,
            message: "withdraw rejected",
          });
        } else {
          res.status(400).json({
            status: false,
            message: "update status withdraw unsuccessful",
          });
        }
      } else {
        res.status(404).json({
          status: false,
          message: "withdraw not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async deleteWithdraw(req, res) {
    try {
      const id = +req.params.id;

      const check = await statusWithdraw.findOne({
        where: { withdrawId: id },
      });
      if (check != null) {
        if (check.status !== "success") {
          const result = await withdraw.destroy({ where: { id } });
          if (result === 1) {
            await statusWithdraw.destroy({ where: { withdrawId: id } });

            res.status(201).json({
              status: true,
              message: "delete withdraw successful",
            });
          } else {
            res.status(400).json({
              status: false,
              message: "delete withdraw unsuccessful",
            });
          }
        } else {
          res.status(400).json({
            status: false,
            message: "Withdraw success cannot delete",
          });
        }
      } else {
        res.status(404).json({
          status: false,
          message: "withdraw not found!",
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
module.exports = WithdrawController;
