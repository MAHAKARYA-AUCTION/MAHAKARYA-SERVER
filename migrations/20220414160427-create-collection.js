"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Collections", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      AdminId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Admins",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Collections");
    await queryInterface.sequelize.query(
      'DROP TYPE "enum_Collections_galleryName";'
    );
  }
};
