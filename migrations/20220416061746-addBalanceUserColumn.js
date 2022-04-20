"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "balance", { type: Sequelize.INTEGER, defaultValue: 0 });
    await queryInterface.addColumn("Users", "balanceSpent", { type: Sequelize.INTEGER, defaultValue: 0 });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Users", "balance");
    queryInterface.removeColumn("Users", "balanceSpent");
  },
};
