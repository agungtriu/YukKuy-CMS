const { Op } = require("sequelize");
const models = require("../models");
const product = models.product;
const order = models.order;
const statusOrder = models.statusOrder;
const visitAccount = models.visitAccount;
const visitProduct = models.visitProduct;
const imageProduct = models.imageProduct;
class HomeCMSController {
  static async getHomeCMS(req, res) {
    try {
      const startDate = new Date(
        req.query.startDate || Date.now() - 7 * 24 * 60 * 60 * 1000
      );
      const endDate = new Date(req.query.endDate || Date.now());
      const accountId = +req.accountData.id;
      const products = await product.findAll({
        where: { accountId, isDelete: 0 },
        include: [imageProduct],
      });

      var orders = [];
      for (const product of products) {
        const result = await order.findAll({
          where: { productId: product.id },
          include: [statusOrder],
        });
        orders.push(...result);
      }

      if (orders !== null) {
        orders = orders.filter(
          (order) => order.statusOrder.status === "verification"
        );
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
        countNewOrder: orders.length,
        countVisitAccount: visitAccounts.length,
        countVisitProduct: countVisitProduct,
        dataVisitProduct: detailVisitProducts,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
}
module.exports = HomeCMSController;
