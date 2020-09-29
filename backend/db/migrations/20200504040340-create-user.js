'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName:{
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      lastName:{
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(150),
        unique: true,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING(60).BINARY,
      },
      tokenId: {
        type: Sequelize.STRING(36),
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
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};
