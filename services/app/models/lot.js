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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Name is required!" },
        notNull: { msg: "Name is required!" },
      },
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Description is required!" },
        notNull: { msg: "Description is required!" },
      },
    },
    size: DataTypes.STRING,
    aspectRatio: DataTypes.STRING,
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{ msg: "Seller Id is required!" },
        notEmpty: { msg: "Seller Id is required!" }
      }
    },
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{ msg: "Collection Id is required!" },
        notEmpty: { msg: "Collection Id is required!" }
      }
    },
    primaryImage: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Primary is required!" },
        notNull: { msg: "Primary is required!" },
      },
    },
    secondImage: DataTypes.STRING,
    thirdImage: DataTypes.STRING,
    startingBid: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: "Starting Bid is required!" },
        notNull: { msg: "Starting Bid is required!" },
      },
    },
    artistName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Artist Name is required!" },
        notNull: { msg: "Artist Name is required!" },
      },
    },
  }, {
    sequelize,
    modelName: 'Lot',
  });
  return Lot;
};