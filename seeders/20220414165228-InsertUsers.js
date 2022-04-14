"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/users.json");

    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = hashPassword(el.password);
    });

    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
