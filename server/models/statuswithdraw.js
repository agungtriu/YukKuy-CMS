"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class statusWithdraw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      statusWithdraw.belongsTo(models.withdraw);
    }
  }
  statusWithdraw.init(
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
      withdrawId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "withdrawId can not be empty.",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: function (statusWithdraw, option) {
          statusWithdraw.status = "request";
        },
      },
      sequelize,
      modelName: "statusWithdraw",
    }
  );
  return statusWithdraw;
};
