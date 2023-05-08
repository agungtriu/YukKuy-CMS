"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class imageProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      imageProduct.belongsTo(models.product);
    }
  }
  imageProduct.init(
    {
      src: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "src can not be empty.",
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
    },
    {
      sequelize,
      modelName: "imageProduct",
    }
  );
  return imageProduct;
};
