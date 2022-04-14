"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Collection.init(
    {
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
      startDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        validate: {
          notEmpty: { msg: "Start Date is required!" },
          notNull: { msg: "Start Date is required!" },
        },
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        validate: {
          notEmpty: { msg: "End Date is required!" },
          notNull: { msg: "End Date is required!" },
        },
      },
    },
    {
      sequelize,
      modelName: "Collection",
    }
  );
  return Collection;
};
