"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Lot, { foreignKey: "SellerId" });
      User.hasMany(models.Transaction);
      User.hasMany(models.Bid);
    }
  }
  User.init(
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
      ktp: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "KTP number is required" },
          notNull: { msg: "KTP number is required" },
        },
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Phone number is required" },
          notNull: { msg: "Phone number is required" },
        },
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Address is required" },
          notNull: { msg: "Address is required" },
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM("seller", "buyer"),
        validate: {
          notEmpty: { msg: "Role is required" },
          notNull: { msg: "Role is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
  });

  return User;
};
