'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Chapters', [
      {
        id: 'c1',
        title: 'Introduction',
        content: 'This book narrates my intellectual journey...',
        order: 1,
        bookId: 'munqidh',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'c2',
        title: 'Theological Doubt',
        content: 'I examined knowledge and certainty...',
        order: 2,
        bookId: 'munqidh',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more chapters if needed
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Chapters', null, {});
  },
};
