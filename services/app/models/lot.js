'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lot.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    size: DataTypes.STRING,
    aspectRatio: DataTypes.STRING,
    sellerId: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER,
    primaryImage: DataTypes.STRING,
    secondImage: DataTypes.STRING,
    thirdImage: DataTypes.STRING,
    startingBid: DataTypes.INTEGER,
    artistName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lot',
  });
  return Lot;
};