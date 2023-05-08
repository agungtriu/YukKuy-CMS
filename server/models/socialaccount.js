"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class socialAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      socialAccount.belongsTo(models.account);
    }
  }
  socialAccount.init(
    {
      platform: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "platform can not be empty.",
          },
        },
      },
      link: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "link can not be empty.",
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
      modelName: "socialAccount",
    }
  );
  return socialAccount;
};
