'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class visitProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      visitProduct.belongsTo(models.product)
      visitProduct.belongsTo(models.account)
    }
  }
  visitProduct.init({
    productId:{
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "productId can not be empty.",
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
  }, {
    sequelize,
    modelName: 'visitProduct',
  });
  return visitProduct;
};