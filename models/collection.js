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
      Collection.belongsTo(models.Admin);
      Collection.hasMany(models.Lot);
    }
  }
  Collection.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Lot name is required" },
          notNull: { msg: "Lot name is required" },
        },
      },
      imgUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Username is required" },
          notNull: { msg: "Username is required" },
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
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          notEmpty: { msg: "Start date is required" },
          notNull: { msg: "Start date is required" },
        },
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          notEmpty: { msg: "End date is required" },
          notNull: { msg: "End date is required" },
        },
      },
      galleryName: DataTypes.ENUM("goliath-gallery", "david-gallery"),
      AdminId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Admin id is required" },
          notNull: { msg: "Admin id is required" },
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
