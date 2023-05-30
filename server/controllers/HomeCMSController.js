const { Op, where } = require("sequelize");
const models = require("../models");
const product = models.product;
const order = models.order;
const statusOrder = models.statusOrder;
const visitAccount = models.visitAccount;
const visitProduct = models.visitProduct;
const imageProduct = models.imageProduct;
const account = models.account;
const withdraw = models.withdraw;
const statusWithdraw = models.statusWithdraw;
class HomeCMSController {
  static async getHomeCMS(req, res) {
    try {
      const startDate = new Date(
        req.query.startDate || Date.now() - 7 * 24 * 60 * 60 * 1000
      );
      const endDate = new Date(req.query.endDate || Date.now());
      const accountId = +req.accountData.id;

      const accountResponse = await account.findOne({
        where: { id: accountId },
      });

      if (accountResponse.role === "seller") {
        const products = await product.findAll({
          where: { accountId, isDelete: 0 },
          include: [imageProduct],
        });

        let orders = [];
        let countIncome = 0;
        for (const product of products) {
          const result = await order.findAll({
            where: {
              productId: product.id,
              createdAt: { [Op.between]: [startDate, endDate] },
            },
            include: [{ model: statusOrder, where: { status: "success" } }],
          });
          orders.push(...result);
        }

        if (orders !== null) {
          for (const order of orders) {
            countIncome += order.totalPrice;
          }
        }

        const visitAccounts = await visitAccount.findAll({
          where: {
            accountId,
            createdAt: { [Op.between]: [startDate, endDate] },
          },
        });

        var countVisitProduct = 0;
        var detailVisitProducts = [];

        for (const product of products) {
          const result = await visitProduct.findAll({
            where: {
              productId: product.id,
              createdAt: { [Op.between]: [startDate, endDate] },
            },
          });
          if (result.length > 0) {
            detailVisitProducts.push({
              ...product.dataValues,
              countVisit: result.length,
            });
            countVisitProduct += result.length;
          }
        }
        detailVisitProducts.sort((a, b) => b.countVisit - a.countVisit);
        res.status(200).json({
          status: true,
          countProduct: products.length,
          countSuccess: orders.length,
          income: countIncome,
          countVisitAccount: visitAccounts.length,
          countVisitProduct: countVisitProduct,
          dataVisitProduct: detailVisitProducts,
        });
      } else if (accountResponse.role === "admin") {
        const accountResponses = await account.findAll();
        const requestWithdrawResponses = await withdraw.findAll({
          include: [{ model: statusWithdraw, where: { status: "request" } }],
        });

        let countIncome = 0;
        const orderResponses = await order.findAll({
          where: {
            createdAt: { [Op.between]: [startDate, endDate] },
          },
          include: [{ model: statusOrder, where: { status: "success" } }],
        });

        if (orderResponses !== null) {
          for (const order of orderResponses) {
            countIncome += order.totalPrice;
          }
        }

        const traficResponses = await visitProduct.findAll({
          where: {
            createdAt: { [Op.between]: [startDate, endDate] },
          },
        });

        res.status(200).json({
          status: true,
          countAccount: accountResponses.length,
          countRequestWithdraw: requestWithdrawResponses.length,
          transaction: countIncome,
          trafic: traficResponses.length,
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
module.exports = HomeCMSController;
