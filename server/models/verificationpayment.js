"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class verificationPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      verificationPayment.belongsTo(models.order);
    }
  }
  verificationPayment.init(
    {
      bankId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "bankId can not be empty.",
          },
        },
      },
      imageReceipt: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "imageReceipt can not be empty.",
          },
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "orderId can not be empty.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "verificationPayment",
    }
  );
  return verificationPayment;
};
