"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bid.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User Id is required!" },
          notEmpty: { msg: "User Id is required!" },
        },
      },
      lotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Lot Id is required!" },
          notEmpty: { msg: "Lot Id is required!" },
        },
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Status is required!" },
          notNull: { msg: "Status is required!" },
        },
      },
      bidPrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Bid Price is required!" },
          notNull: { msg: "Bid Price is required!" },
        },
      },
    },
    {
      sequelize,
      modelName: "Bid",
    }
  );
  return Bid;
};
