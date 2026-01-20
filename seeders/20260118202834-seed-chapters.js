'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Chapters', [
      {
        title: 'Introduction',
        content: 'This book narrates my intellectual journey...',
        order: 1,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Theological Doubt',
        content: 'I examined knowledge and certainty...',
        order: 2,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Chapters', null, {});
  },
};
