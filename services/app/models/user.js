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
    }
  }
  User.init(
    {
      fullname: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Fullname is required!" },
          notNull: { msg: "Fullname is required!" },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: { msg: "Email is required!" },
          notNull: { msg: "Email is required!" },
          isEmail: { msg: "Invalid email format!" },
        },
        unique: {
          args: true,
          msg: "Email must be unique!",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 10],
          notNull: { msg: "Password is required!" },
          notEmpty: { msg: "Password is required!" },
        },
      },
      ktp: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: { msg: "KTP is required!" },
          notNull: { msg: "KTP is required!" },
        },
        unique: {
          args: true,
          msg: "Ktp already used!",
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "phone number is required!" },
          notEmpty: { msg: "phone number is required!" },
        },
        unique: {
          args: true,
          msg: "Phone Number already used!",
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Address is required!" },
          notEmpty: { msg: "Adress is required" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
