"use strict";
const { Model } = require("sequelize");
const imageproduct = require("./imageproduct");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.account);
      product.belongsTo(models.guide);
      product.hasMany(models.order);
      product.hasMany(models.imageProduct);
      product.hasMany(models.visitProduct);
    }
  }
  product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "name can not be empty.",
          },
        },
      },
      dateStart: {
        type: DataTypes.DATE,
        validate: {
          isDate: {
            message: "Invalid date",
          },
          notEmpty: {
            message: "dateStart can not be empty.",
          },
        },
      },
      dateEnd: {
        type: DataTypes.DATE,
        validate: {
          isDate: {
            message: "Invalid date",
          },
          notEmpty: {
            message: "dateEnd can not be empty.",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "price can not be empty.",
          },
        },
      },
      province: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "province can not be empty.",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "city can not be empty.",
          },
        },
      },
      addressDetail: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "addressDetail can not be empty.",
          },
        },
      },
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING,
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            message: "description can not be empty.",
          },
        },
      },
      addressMeetingPoint: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "addressMeetingPoint can not be empty.",
          },
        },
      },
      isLive: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "isLive can not be empty.",
          },
        },
      },
      isDelete: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "isDelete can not be empty.",
          },
        },
      },
      accountId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "accountId can not be empty.",
          },
        },
      },
      guideId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "guideId can not be empty.",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: function (product, option) {
          product.isLive = 1;
          product.isDelete = 0;
        },
      },
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
