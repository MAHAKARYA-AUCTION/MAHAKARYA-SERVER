"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Collections", "galleryName", Sequelize.ENUM("Goliath", "David"));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Collections", "galleryName");
  },
};
