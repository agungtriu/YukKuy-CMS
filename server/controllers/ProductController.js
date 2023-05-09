const deleteBulkFile = require("../helpers/deleteBulkFile");
const deleteFile = require("../helpers/deleteFile");
const models = require("../models");
const product = models.product;
const account = models.account;
const imageProduct = models.imageProduct;
const visitProduct = models.visitProduct;
class ProductController {
  static async getProductsMobile(req, res) {
    try {
      const result = await product.findAll({
        where: { isLive: 1 },
        include: [imageProduct],
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

  static async getProductsCMS(req, res) {
    try {
      const accountId = +req.accountData.id;
      const result = await product.findAll({
        where: { accountId },
        include: [imageProduct],
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

  static async getProductCMS(req, res) {
    try {
      const id = req.params.id;
      const result = await product.findOne({
        where: { id },
        include: [imageProduct],
      });
      if (result !== null) {
        res.status(200).json({
          status: true,
          data: result,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "product not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async getProductMobile(req, res) {
    try {
      const id = req.params.id;
      const result = await product.findOne({
        where: { id },
        include: [imageProduct],
      });

      if (result !== null) {
        const seller = await account.findOne({
          where: { id: result.accountId },
        });

        await visitProduct.create({
          productId: result.id,
          accountId: result.accountId,
        });

        await res.status(200).json({
          status: true,
          data: { ...result.dataValues, seller: seller },
        });
      } else {
        res.status(404).json({
          status: false,
          message: "product not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async getCity(req, res) {
    try {
      const city = await product.findAll({
        attributes: ["city"],
        group: ["city"],
      });

      res.status(200).json({
        status: true,
        count: city.length,
        data: city,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async addProduct(req, res) {
    try {
      const {
        name,
        dateStart,
        dateEnd,
        price,
        province,
        city,
        addressDetail,
        longitude,
        latitude,
        description,
        addressMeetingPoint,
        guideId,
      } = req.body;
      const accountId = +req.accountData.id;

      const _dateStart = new Date(dateStart);
      const _dateEnd = new Date(dateEnd);

      const result = await product.create({
        name,
        dateStart: _dateStart,
        dateEnd: _dateEnd,
        price,
        province,
        city,
        addressDetail,
        longitude,
        latitude,
        description,
        addressMeetingPoint,
        accountId,
        guideId,
      });

      if (result !== null) {
        const images = req.files;
        for (const image of images) {          
          await imageProduct.create({
            src: image.filename,
            productId: result.dataValues.id,
          });
        }

        res.status(201).json({
          status: true,
          message: `${result.name} has been added!`,
          data: result,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "product failed to add!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async editProduct(req, res) {
    try {
      const id = +req.params.id;
      const {
        name,
        dateStart,
        dateEnd,
        price,
        province,
        city,
        addressDetail,
        longitude,
        latitude,
        description,
        addressMeetingPoint,
        guideId,
      } = req.body;

      const _dateStart = new Date(dateStart);
      const _dateEnd = new Date(dateEnd);

      const result = await product.update(
        {
          name,
          dateStart: _dateStart,
          dateEnd: _dateEnd,
          price,
          province,
          city,
          addressDetail,
          longitude,
          latitude,
          description,
          addressMeetingPoint,
          guideId,
        },
        { where: { id } }
      );
      
      const images = req.files;
      console.log(images)
      if (result[0] === 1) {
        const imagesBefore = await imageProduct.findAll({
          where: { productId: id },
        });
        if (imagesBefore !== null) {
          deleteBulkFile(imagesBefore);
          await imageProduct.destroy({ where: { productId: id } });
        }
        for (const image of images) {          
          await imageProduct.create({
            src: image.filename,
            productId: id,
          });
        }

        res.status(201).json({
          status: true,
          message: "update product successful",
        });
      } else {
        images.forEach(image => {
          deleteFile(image.filename)
        })

        res.status(400).json({
          status: false,
          message: "update product unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async showProduct(req, res) {
    try {
      const id = +req.params.id;
      const { isLive } = req.body;

      const result = await product.update(
        {
          isLive,
        },
        { where: { id } }
      );

      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message:
            isLive == 1 ? "product has been live" : "product has been hidden",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "hide product unsuccessful",
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

module.exports = ProductController;
