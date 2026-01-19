const { Book, Genre, Chapter } = require('../models');

module.exports = {
  // Get all books with genre info
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get one book by id with its chapters ordered by 'order'
  async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id, {
        include: [
          {
            model: Chapter,
            as: 'chapters',
            order: [['order', 'ASC']],
          },
          {
            model: Genre,
            as: 'genre',
            attributes: ['id', 'title'],
          },
        ],
      });

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Create a new book with basic validation
  async createBook(req, res) {
    try {
      const {
        id,
        title,
        author,
        info,
        description,
        historical_context,
        author_bio,
        image,
        genreId,
      } = req.body;

      // Basic validation
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Valid "id" (string) is required' });
      }
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Valid "title" (string) is required' });
      }
      if (!author || typeof author !== 'string') {
        return res.status(400).json({ error: 'Valid "author" (string) is required' });
      }
      if (!genreId || typeof genreId !== 'string') {
        return res.status(400).json({ error: 'Valid "genreId" (string) is required' });
      }

      // Check genre exists
      const genre = await Genre.findByPk(genreId);
      if (!genre) {
        return res.status(400).json({ error: 'Invalid genreId' });
      }

      // Check if book with this id already exists
      const existingBook = await Book.findByPk(id);
      if (existingBook) {
        return res.status(409).json({ error: 'Book with this id already exists' });
      }

      // Create book
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete a book by id
  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const deletedCount = await Book.destroy({ where: { id } });

      if (deletedCount === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }

      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  // GET /books/:bookId/read
async readFullBook(req, res) {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id, {
      include: [
        {
          model: Chapter,
          as: 'chapters',
          order: [['order', 'ASC']],
        },
        {
          model: Genre,
          as: 'genre',
          attributes: ['id', 'title'],
        },
      ],
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

};
