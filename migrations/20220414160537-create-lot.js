"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Lots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      width: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      height: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      startingBid: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      SellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      CollectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Collections",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      primaryImage: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      secondImage: {
        type: Sequelize.STRING,
      },
      thirdImage: {
        type: Sequelize.STRING,
      },
      fourthImage: {
        type: Sequelize.STRING,
      },
      artistName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Lots");
  },
};
