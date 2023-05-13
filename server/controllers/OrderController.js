const { where } = require("sequelize");
const models = require("../models");
const product = models.product;
const statusOrder = models.statusOrder;
const order = models.order;
const account = models.account;
const verificationPayment = models.verificationPayment;

class OrderController {
  static async getOrdersCMS(req, res) {
    try {
      const accountId = +req.accountData.id;
      const status = req.query.status;
      var results = [];
      if (status === undefined) {
        const products = await product.findAll({
          where: { accountId },
        });

        for (const product of products) {
          const result = await order.findAll({
            where: { productId: product.id },
            include: [
              { model: statusOrder },
              {
                model: verificationPayment,
                limit: 1,
                order: [["createdAt", "DESC"]],
              },
            ],
          });
          results.push(...result);
        }

        results.sort(
          (a, b) => b.statusOrder.updatedAt - a.statusOrder.updatedAt
        );
      } else {
        if (status === "success") {
          results = await product.findAll({
            where: {
              accountId,
            },
            include: [
              {
                model: order,
                include: [{ model: statusOrder, where: { status } }],
              },
            ],
            order: [["updatedAt", "DESC"]],
          });
        } else {
          const products = await product.findAll({
            where: { accountId },
          });
          if (status === "verification") {
            for (const product of products) {
              const result = await order.findAll({
                where: { productId: product.id },
                include: [
                  { model: statusOrder, where: { status } },
                  {
                    model: verificationPayment,
                    limit: 1,
                    order: [["createdAt", "DESC"]],
                  },
                ],
              });
              results.push(...result);
            }
          } else {
            for (const product of products) {
              const result = await order.findAll({
                where: { productId: product.id },
                include: [{ model: statusOrder, where: { status } }],
              });
              results.push(...result);
            }
          }
          results.sort(
            (a, b) => b.statusOrder.updatedAt - a.statusOrder.updatedAt
          );
        }
      }
      res.status(200).json({
        status: true,
        count: results.length,
        data: results,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async getOrdersMobile(req, res) {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const skipIndex = (page - 1) * limit;

      const accountId = +req.accountData.id;
      const status = req.query.status;
      var orders = [];
      if (status === undefined) {
        orders = await order.findAll({
          limit,
          offset: skipIndex,
          where: { accountId },
          include: [statusOrder],
          order: [[statusOrder, "updatedAt", "DESC"]],
        });
      } else {
        orders = await order.findAll({
          limit,
          offset: skipIndex,
          where: { accountId },
          include: [{ model: statusOrder, where: { status } }],
          order: [[statusOrder, "updatedAt", "DESC"]],
        });
      }
      var results = []
      for (const order of orders) {
        const _product = await product.findOne({where: {id: order.productId}})
        results.push({...order.dataValues, product: _product})
      }
      
      console.log(results)

      res.status(200).json({
        status: true,
        page: page,
        count: results.length,
        data: results,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async getOrder(req, res) {
    try {
      const id = +req.params.id;
      const resultOrder = await order.findOne({
        where: { id },
        include: [statusOrder],
      });

      if (resultOrder !== null) {
        if (resultOrder.statusOrder.status === "success") {
          const resultProduct = await product.findOne({
            where: { id: resultOrder.productId },
          });

          const resultSeller = await account.findOne({
            where: { id: resultProduct.accountId },
          });
          res.status(200).json({
            status: true,
            data: {
              ...resultOrder,
              product: resultProduct,
              seller: resultSeller,
            },
          });
        } else {
          res.status(200).json({
            status: true,
            data: resultOrder,
          });
        }
      } else {
        res.status(404).json({
          status: false,
          message: "order not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async addOrder(req, res) {
    try {
      const { totalPackage, totalPrice, name, phone, email, productId } =
        req.body;

      const accountId = +req.accountData.id;
      const uniquePrice = +totalPrice + Math.floor(Math.random() * 1000);

      const resultOrder = await order.create({
        totalPackage,
        totalPrice: uniquePrice,
        name,
        phone,
        email,
        productId,
        accountId,
      });
      console.log(resultOrder);
      if (resultOrder !== null) {
        await statusOrder.create({
          orderId: resultOrder.id,
          status: "payment",
        });

        res.status(201).json({
          status: true,
          message: "order has been made",
          data: resultOrder,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "failed to order!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async cancelOrder(req, res) {
    try {
      const orderId = req.params.id;
      const { reason } = req.body;
      const result = await statusOrder.update(
        {
          status: "cancel",
          reason,
        },
        { where: { orderId } }
      );
      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: "order has been canceled",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "failed to cancel order",
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
module.exports = OrderController;
