"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/lots.json");

    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Lots", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Lots", null, {});
  },
};
