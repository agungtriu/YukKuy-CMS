"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.product);
      order.hasMany(models.verificationPayment);
      order.hasOne(models.statusOrder);
    }
  }
  order.init(
    {
      totalPackage: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "totalPackage can not be empty.",
          },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "totalPrice can not be empty.",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "name can not be empty.",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "phone can not be empty.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            message: "Invalid email address",
          },
          notEmpty: {
            message: "email can not be empty.",
          },
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "productId can not be empty.",
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
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return order;
};
