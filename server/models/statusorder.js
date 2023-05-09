"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class statusOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      statusOrder.belongsTo(models.order);
    }
  }
  statusOrder.init(
    {
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "status can not be empty.",
          },
        },
      },
      reason: DataTypes.STRING,
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
      modelName: "statusOrder",
    }
  );
  return statusOrder;
};
