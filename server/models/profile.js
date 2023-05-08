"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile.belongsTo(models.account);
    }
  }
  profile.init(
    {
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      avatar: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "avatar can not be empty.",
          },
        },
      },
      bannerImage: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "bannerImage can not be empty.",
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
      hooks: {
        beforeCreate: function (profile, option) {
          profile.avatar = "avatar_default.png";
          profile.bannerImage = "image_default.png";
        },
      },
      sequelize,
      modelName: "profile",
    }
  );
  return profile;
};
