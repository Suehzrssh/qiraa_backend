'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Genres', [
      {
        id: 'religious',
        title: 'Religious',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'philosophical',
        title: 'Philosophical',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'historical',
        title: 'Historical',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Genres', null, {});
  },
};
