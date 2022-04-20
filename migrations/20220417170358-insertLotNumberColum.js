"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Lots", "lotNumber", Sequelize.INTEGER);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Lots", "lotNumber");
  },
};
