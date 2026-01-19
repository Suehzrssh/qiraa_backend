const { Genre } = require('../models');

module.exports = {
  async getAllGenres(req, res) {
    try {
      const genres = await Genre.findAll();
      return res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  },
};
