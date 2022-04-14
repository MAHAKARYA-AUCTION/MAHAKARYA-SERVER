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
      Bid.belongsTo(models.User);
      Bid.belongsTo(models.Lot);
    }
  }
  Bid.init(
    {
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "User id is required" },
          notNull: { msg: "User id is required" },
        },
      },
      LotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Lot id is required" },
          notNull: { msg: "Lot id is required" },
        },
      },
      isHighest: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          notEmpty: { msg: "isHighest is required" },
          notNull: { msg: "isHighest is required" },
        },
      },
      bidPrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Bid price is required" },
          notNull: { msg: "Bid price is required" },
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
