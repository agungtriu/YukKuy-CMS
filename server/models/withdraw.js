"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class withdraw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      withdraw.belongsTo(models.account);
      withdraw.belongsTo(models.bank);
      withdraw.hasOne(models.statusWithdraw);
    }
  }
  withdraw.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "amount can not be empty.",
          },
        },
      },
      bankId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "bankId can not be empty.",
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
      modelName: "withdraw",
    }
  );
  return withdraw;
};
