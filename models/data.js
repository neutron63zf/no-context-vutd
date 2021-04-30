'use strict';
const {
  Model
} = require('sequelize');
class Data extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
};
module.exports = (sequelize, DataTypes) => {
  Data.init({
    url: DataTypes.STRING,
    content: DataTypes.STRING,
    group: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'data',
  });
  return Data;
};