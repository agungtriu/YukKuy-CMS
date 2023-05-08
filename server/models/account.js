"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      account.hasOne(models.profile);
      account.hasMany(models.bank);
      account.hasMany(models.socialAccount);
      account.hasMany(models.visitAccount);
      account.hasMany(models.guide);
      account.hasMany(models.product);
      account.hasMany(models.order);
      account.hasMany(models.visitProduct);
    }
  }
  account.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "username can not be empty.",
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
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "password can not be empty.",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "role can not be empty.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "account",
    }
  );
  return account;
};
