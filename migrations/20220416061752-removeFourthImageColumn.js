"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn("Lots", "fourthImage");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Lots", "fourthImage", Sequelize.STRING);
  },
};
