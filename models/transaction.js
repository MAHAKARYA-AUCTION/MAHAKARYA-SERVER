"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User);
      Transaction.belongsTo(models.Lot);
    }
  }
  Transaction.init(
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
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Lot id is required" },
        },
      },
      transactionNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Transaction number is required" },
          notNull: { msg: "Transaction number is required" },
        },
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM("pending", "success", "failed"),
        defaultValue: "pending",
        validate: {
          notEmpty: { msg: "Transaction status is required" },
          notNull: { msg: "Transaction status is required" },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "price is required" },
          notNull: { msg: "price is required" },
        },
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM("topup", "payment"),
        validate: {
          notEmpty: { msg: "Type is required" },
          notNull: { msg: "Type is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
