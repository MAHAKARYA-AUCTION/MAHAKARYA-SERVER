"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/collections.json");

    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Collections", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Collections", null, {});
  },
};
