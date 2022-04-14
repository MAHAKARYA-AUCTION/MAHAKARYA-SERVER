"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/admins.json");

    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = hashPassword(el.password);
    });

    await queryInterface.bulkInsert("Admins", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
