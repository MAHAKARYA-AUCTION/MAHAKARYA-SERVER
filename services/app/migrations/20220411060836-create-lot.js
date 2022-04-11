'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      aspectRatio: {
        type: Sequelize.STRING
      },
      sellerId: {
        type: Sequelize.INTEGER
      },
      collectionId: {
        type: Sequelize.INTEGER
      },
      primaryImage: {
        type: Sequelize.STRING
      },
      secondImage: {
        type: Sequelize.STRING
      },
      thirdImage: {
        type: Sequelize.STRING
      },
      startingBid: {
        type: Sequelize.INTEGER
      },
      artistName: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Lots');
  }
};