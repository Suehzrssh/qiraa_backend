const { Book, Genre, Chapter } = require('../models');

module.exports = {
  async getAllBooks(req, res) {
    try {
      const books = await Book.findAll({
        include: {
          model: Genre,
          as: 'genre',
          attributes: ['id', 'title'],
        },
      });
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  async getBookById(req, res) {
    try {
      const book = await Book.findByPk(req.params.id, {
        include: [
          {
            model: Chapter,
            as: 'chapters',
            separate: true,
            order: [['order', 'ASC']],
          },
          {
            model: Genre,
            as: 'genre',
            attributes: ['id', 'title'],
          },
        ],
      });

      if (!book) return res.status(404).json({ error: 'Book not found' });
      res.json(book);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  },

  async createBook(req, res) {
    try {
      const {
        title,
        author,
        info,
        description,
        historical_context,
        author_bio,
        image,
        genreId,
      } = req.body;

      if (!title || !author || !genreId) {
        return res.status(400).json({ error: 'Title, author and genre are required' });
      }

      const genre = await Genre.findByPk(genreId);
      if (!genre) {
        return res.status(400).json({ error: 'Invalid genre' });
      }

      const book = await Book.create({
        title,
        author,
        info,
        description,
        historical_context,
        author_bio,
        image,
        genreId,
      });

      res.status(201).json(book);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async deleteBook(req, res) {
    const deleted = await Book.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
  },

  async readFullBook(req, res) {
    const book = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Chapter,
          as: 'chapters',
          separate: true,
          order: [['order', 'ASC']],
        },
        {
          model: Genre,
          as: 'genre',
          attributes: ['id', 'title'],
        },
      ],
    });

    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  },
};
