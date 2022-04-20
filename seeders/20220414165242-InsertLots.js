"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/lots.json");

    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.size = `${el.width} x ${el.height} cm`;
    });

    await queryInterface.bulkInsert("Lots", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Lots", null, {});
  },
};
