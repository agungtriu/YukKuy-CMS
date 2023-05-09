const { where } = require("sequelize");
const models = require("../models");
const product = models.product;
const statusOrder = models.statusOrder;
const order = models.order;
const account = models.account;

class OrderController {
  static async getOrdersCMS(req, res) {
    try {
      const accountId = +req.accountData.id;

      const products = await product.findAll({
        where: { accountId },
      });
      
      var orders = [];
      for (const product of products) {
        const result = await order.findAll({
          where: { productId: product.id },
          include: [statusOrder],
        });
        orders.push(...result);
      }
      res.status(200).json({
        status: true,
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
  static async getOrdersSuccess(req, res) {
    try {
      const accountId = +req.accountData.id;

      const products = await product.findAll({
        where: { accountId },
      });
      
      var recapSuccess = [];
      for (const product of products) {
        var orders = await order.findAll({
          where: { productId: product.id},
          include: [statusOrder],
        });
        if (orders !== null) {
          orders = orders.filter(
            (order) => order.statusOrder.status === "success"
          );
        }
        if (orders.length>0 && product.dataValues.isLive === 1) { 
          recapSuccess.push({...product.dataValues, count: orders.length, data: orders} );
        }
      }
      res.status(200).json({
        status: true,
        count: recapSuccess.length,
        data: recapSuccess,
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
      const accountId = +req.accountData.id;
      const result = await order.findAll({
        where: { accountId },
        include: [statusOrder],
      });
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
      const uniquePrice = +totalPrice + Math.floor(Math.random() * 100);

      const resultOrder = await order.create({
        totalPackage,
        totalPrice: uniquePrice,
        name,
        phone,
        email,
        productId,
        accountId,
      });

      if (resultOrder !== null) {
        await statusOrder.create({
          orderId: resultOrder.id,
          status: "payment",
        });

        res.status(201).json({
          status: true,
          message: "order has been made",
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
