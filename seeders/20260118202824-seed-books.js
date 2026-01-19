'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Books', [
      {
        id: 'munqidh',
        title: 'Al-Munqidh min al-Dalal',
        author: 'Imam al-Ghazali',
        info: 'Autobiographical · Theology · Epistemology',
        description: 'In this autobiographical work, al-Ghazali reflects on his spiritual and intellectual crisis, examining theology, philosophy, and mysticism in his search for certain knowledge.',
        historical_context: 'Written in the late 11th century, Al-Munqidh min al-Dalal reflects the intellectual tensions of the Abbasid era, marked by debates between theologians, philosophers, and mystics. The work was composed after al-Ghazali’s withdrawal from public teaching and documents his reassessment of certainty, knowledge, and spiritual authority.',
        author_bio: 'Abu Hamid Muhammad ibn Muhammad al-Ghazali (1058–1111) was a Persian theologian, jurist, and mystic. He taught at the Nizamiyya Madrasa in Baghdad before abandoning his post during a profound spiritual crisis. His writings shaped Sunni theology and Islamic intellectual history.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Al-Ghazali.png/300px-Al-Ghazali.png',
        genreId: 'religious',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more books here if needed
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
