'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Al-Munqidh min al-Dalal',
        author: 'Imam al-Ghazali',
        info: 'Autobiographical · Theology · Epistemology',
        description:
          'In this autobiographical work, al-Ghazali reflects on his spiritual and intellectual crisis, examining theology, philosophy, and mysticism in his search for certain knowledge.',
        historical_context:
          'Written in the late 11th century, Al-Munqidh min al-Dalal reflects the intellectual tensions of the Abbasid era...',
        author_bio:
          'Abu Hamid Muhammad ibn Muhammad al-Ghazali (1058–1111) was a Persian theologian...',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Al-Ghazali.png/300px-Al-Ghazali.png',
        genreId: 'religious',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
