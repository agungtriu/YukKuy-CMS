"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class visitAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      visitAccount.belongsTo(models.account);
    }
  }
  visitAccount.init(
    {
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
      modelName: "visitAccount",
    }
  );
  return visitAccount;
};
