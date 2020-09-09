'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fName: {
        type: Sequelize.STRING
      },
      fType: {
        type: Sequelize.STRING
      },
      fSize: {
        type: Sequelize.STRING
      },
      fDate: {
        type: Sequelize.STRING
      },
      fImg: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        references: {
          model: 'UserTs',
          key: 'email'
        }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Data');
  }
};