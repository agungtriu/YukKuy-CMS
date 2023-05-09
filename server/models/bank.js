"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bank.belongsTo(models.account);
    }
  }
  bank.init(
    {
      bank: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "bank name can not be empty.",
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
      number: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "number can not be empty.",
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
      modelName: "bank",
    }
  );
  return bank;
};
