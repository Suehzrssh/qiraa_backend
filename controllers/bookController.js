const { Book, Genre, Chapter } = require('../models');

module.exports = {

  // GET /books
  async getAllBooks(req, res) {
    try {
      const books = await Book.findAll({
        include: {
          model: Genre,
          as: 'genre',
          attributes: ['id', 'name'], // ❗ title değil name
        },
      });

      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // GET /books/:id
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
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // POST /books
  async createBook(req, res) {
    try {
      const {
        id,            // ❗ MANUEL ID
        title,
        author,
        info,
        description,
        historical_context,
        author_bio,
        image,
        genreId,
      } = req.body;

      if (!id || !title || !author || !genreId) {
        return res.status(400).json({
          error: 'id, title, author and genreId are required',
        });
      }

      const genre = await Genre.findByPk(genreId);
      if (!genre) {
        return res.status(400).json({ error: 'Invalid genre' });
      }

      const book = await Book.create({
        id,
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

  // DELETE /books/:id
  async deleteBook(req, res) {
    try {
      const deleted = await Book.destroy({
        where: { id: req.params.id },
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Book not found' });
      }

      res.json({ message: 'Book deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // GET /books/:id/read
  async readFullBook(req, res) {
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
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },
};
