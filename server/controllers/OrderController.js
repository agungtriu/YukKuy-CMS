const { where } = require("sequelize");
const models = require("../models");
const { coreApi, snap } = require("../middlewares/midtrans");
const product = models.product;
const statusOrder = models.statusOrder;
const order = models.order;
const account = models.account;
const imageProduct = models.imageProduct;
const guide = models.guide;

class OrderController {
  static async getOrdersCMS(req, res) {
    try {
      const accountId = +req.accountData.id;
      const status = req.query.status;
      var results = [];
      if (status === undefined) {
        const products = await product.findAll({
          where: { accountId },
          include: [imageProduct],
        });

        for (const product of products) {
          const orders = await order.findAll({
            where: { productId: product.id },
            include: [{ model: statusOrder }],
          });
          if (orders.length > 0) {
            orders.forEach((order) => {
              results.push({ ...order.dataValues, product: product });
            });
          }
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
              { model: imageProduct },
            ],
            order: [["updatedAt", "DESC"]],
          });

          results = results.filter(
            (product) => product.orders.length > 0 && +product.isDelete === 0
          );
        } else {
          const products = await product.findAll({
            where: { accountId },
            include: [imageProduct],
          });
          for (const product of products) {
            const orders = await order.findAll({
              where: { productId: product.id },
              include: [{ model: statusOrder, where: { status } }],
            });
            if (orders.length > 0) {
              orders.forEach((order) => {
                results.push({ ...order.dataValues, product: product });
              });
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
      var results = [];
      for (const order of orders) {
        const _product = await product.findOne({
          where: { id: order.productId },
          include: [imageProduct],
        });
        results.push({ ...order.dataValues, product: _product });
      }

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
      const id = req.params.id;
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

          const resultGuide = await guide.findOne({
            where: { id: resultProduct.guideId },
          });
          res.status(200).json({
            status: true,
            data: {
              ...resultOrder.dataValues,
              product: resultProduct,
              guide: resultGuide,
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
      const orderId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
      console.log(orderId);
      const resultOrder = await order.create({
        id: orderId,
        totalPackage,
        totalPrice,
        name,
        phone,
        email,
        responseMidtrains: "",
        urlMidtrans: "",
        productId,
        accountId,
      });
      if (resultOrder !== null) {
        await statusOrder.create({
          orderId: orderId,
          status: "payment",
        });
        let parameter = {
          transaction_details: {
            order_id: orderId,
            gross_amount: totalPrice,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name: name,
            email: email,
            phone: phone,
          },
        };
        const resultMidtrans = await snap.createTransaction(parameter);
        await order.update(
          { urlMidtrans: resultMidtrans.redirect_url },
          { where: { id: orderId } }
        );

        res.status(201).json({
          status: true,
          message: "order has been made",
          data: {
            redirectUrl: resultMidtrans.redirect_url,
          },
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

  static async notificationMidtrains(req, res) {
    try {
      const notificationResponse = await coreApi.transaction.notification(
        req.body
      );
      let orderId = notificationResponse.order_id;

      const responseMidtrains = JSON.stringify(notificationResponse);

      const updateOrder = await order.update(
        { responseMidtrans: responseMidtrains },
        { where: { id: orderId } }
      );

      if (notificationResponse.transaction_status === "settlement") {
        const orderResponse = await order.findOne({ where: { id: orderId } });
        const productRespone = await product.findOne({where: {id: orderResponse.productId}})
        const accountResponse = await account.findOne({
          where: { id: productRespone.accountId },
        });
        const saldo = +accountResponse.saldo + +orderResponse.totalPrice;

        await account.update({ saldo }, { where: { id: accountResponse.id } });

        await statusOrder.update(
          {
            status: "success",
            reason: "",
          },
          { where: { orderId } }
        );
      } else if (notificationResponse.transaction_status === "pending") {
        await statusOrder.update(
          {
            status: "payment",
            reason: "",
          },
          { where: { orderId } }
        );
      } else if (
        notificationResponse.transaction_status === "deny" ||
        notificationResponse.transaction_status === "cancel"
      ) {
        await statusOrder.update(
          {
            status: "reject",
            reason: "Your transaction has been rejected by the system",
          },
          { where: { orderId } }
        );
      } else if (notificationResponse.transaction_status === "expire") {
        await statusOrder.update(
          {
            status: "cancel",
            reason: "Your transaction has expired",
          },
          { where: { orderId } }
        );
      }

      if (updateOrder[0] === 1) {
        res.status(201).json({
          status: true,
          message: "notification success",
        });
      } else {
        res.status(400).json({
          status: true,
          message: "failed to update order",
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
