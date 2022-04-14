"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Collection);
    }
  }
  Admin.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Username is required" },
          notNull: { msg: "Username is required" },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Invalid email format" },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
          len: {
            args: 5,
            msg: "Password must be at least 5 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );

  Admin.beforeValidate((instance, options) => {
    instance.password = hashPassword(instance.password);
  });

  return Admin;
};
