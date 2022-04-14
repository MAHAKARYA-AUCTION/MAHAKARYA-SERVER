"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lot.belongsTo(models.User, { foreignKey: "SellerId" });
      Lot.belongsTo(models.Collection);
      Lot.hasMany(models.Bid);
      Lot.hasMany(models.Transaction);
    }
  }
  Lot.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "name is required" },
          notNull: { msg: "name is required" },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notEmpty: { msg: "Description is required" },
          notNull: { msg: "Description is required" },
        },
      },
      width: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Width is required" },
          notNull: { msg: "Width is required" },
        },
      },
      height: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Height is required" },
          notNull: { msg: "Height is required" },
        },
      },
      size: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Size is required" },
          notNull: { msg: "Size is required" },
        },
      },
      startingBid: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Starting bid is required" },
          notNull: { msg: "Starting bid is required" },
        },
      },
      SellerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Seller id is required" },
          notNull: { msg: "Seller id is required" },
        },
      },
      CollectionId: DataTypes.INTEGER,
      primaryImage: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Primary image is required" },
          notNull: { msg: "Primary image is required" },
        },
      },
      secondImage: DataTypes.STRING,
      thirdImage: DataTypes.STRING,
      fourthImage: DataTypes.STRING,
      artistName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Artist name is required" },
          notNull: { msg: "Artist name is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Lot",
    }
  );
  return Lot;
};
