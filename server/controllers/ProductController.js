const { Op } = require("sequelize");
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
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const skipIndex = (page - 1) * limit;

      const city = req.query.city;
      var results = [];
      if (city === undefined) {
        results = await product.findAll({
          limit,
          offset: skipIndex,
          where: { isLive: 1 },
          include: [imageProduct],
          order: [["updatedAt", "DESC"]],
        });
      } else {
        results = await product.findAll({
          limit,
          offset: skipIndex,
          where: { isLive: 1, city },
          include: [imageProduct],
          order: [["updatedAt", "DESC"]],
        });
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

  static async getProductsCMS(req, res) {
    try {
      const accountId = +req.accountData.id;
      const result = await product.findAll({
        where: { accountId },
        include: [imageProduct],
        order: [["updatedAt", "DESC"]],
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

  static async searchProductsByKey(req, res) {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const skipIndex = (page - 1) * limit;

      const key = req.query.key;
      const result = await product.findAll({
        limit,
        offset: skipIndex,
        where: {
          isLive: 1,
          [Op.or]: [
            { name: { [Op.iLike]: `%${key}%` } },
            { province: { [Op.iLike]: `%${key}%` } },
            { city: { [Op.iLike]: `%${key}%` } },
          ],
        },
        include: [imageProduct],
        order: [["updatedAt", "DESC"]],
      });

      res.status(200).json({
        status: true,
        page: page,
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
    var resultProduct = {};
    var resultImages = [];
    try {
      const images = req.files;
      if (images.length > 0) {
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

        resultProduct = await product.create({
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

        if (resultProduct !== null) {
          for (const image of images) {
            const resultImage = await imageProduct.create({
              src: image.filename,
              productId: resultProduct.dataValues.id,
            });
            resultImages.push(resultImage.dataValues);
          }

          res.status(201).json({
            status: true,
            message: `${resultProduct.name} has been added!`,
            data: resultProduct,
          });
        } else {
          res.status(400).json({
            status: false,
            message: "product failed to add!",
          });
        }
      } else {
        res.status(400).json({
          status: false,
          message: "images cannot be null",
        });
      }
    } catch (error) {
      try {
        await product.destroy({
          where: { id: resultProduct.id },
        });
        for (const image of resultImages) {
          const deleteImage = await imageProduct.destroy({
            where: { id: image.id },
          });
          if (deleteImage === 1) {
            deleteFile(image.src);
          }
        }
      } catch (error) {
      } finally {
        res.status(500).json({
          status: false,
          error: error,
        });
      }
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
        images.forEach((image) => {
          deleteFile(image.filename);
        });

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
