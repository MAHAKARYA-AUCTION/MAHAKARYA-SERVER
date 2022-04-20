"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Collections", "galleryName", Sequelize.ENUM("goliath-gallery", "david-gallery"));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Collections", "galleryName");
  },
};
