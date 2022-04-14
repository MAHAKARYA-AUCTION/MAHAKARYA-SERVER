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
    }
  }
  Transaction.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User Id is required!" },
          notEmpty: { msg: "User Id is required!" },
        },
      },
      LotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Lot Id is required!" },
          notEmpty: { msg: "Lot Id is required!" },
        },
      },
      transactionNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Transaction Number is required!" },
          notNull: { msg: "Transaction Number is required!" },
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
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Price is required!" },
          notNull: { msg: "Price is required!" },
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
