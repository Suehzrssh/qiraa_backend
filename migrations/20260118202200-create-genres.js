'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create table Genres
    await queryInterface.createTable('Genres', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // Insert fixed genres
    await queryInterface.bulkInsert('Genres', [
      { id: 'historical', title: 'Historical', createdAt: new Date(), updatedAt: new Date() },
      { id: 'religious', title: 'Religious', createdAt: new Date(), updatedAt: new Date() },
      { id: 'philosophical', title: 'Philosophical', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    // Remove all genres and drop the table
    await queryInterface.bulkDelete('Genres', null, {});
    await queryInterface.dropTable('Genres');
  },
};
