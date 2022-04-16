"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "balance", Sequelize.INTEGER);
    await queryInterface.addColumn("Users", "balanceSpent", Sequelize.INTEGER);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Users", "balance");
    queryInterface.removeColumn("Users", "balanceSpent");
  },
};
