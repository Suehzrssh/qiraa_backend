const { Chapter, Book } = require('../models');

module.exports = {
  // Get all chapters of a book by bookId
  async getAllChaptersOfBook(req, res) {
    try {
      const { bookId } = req.params;

      const chapters = await Chapter.findAll({
        where: { bookId },
        order: [['order', 'ASC']],
      });

      res.json(chapters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get ONE chapter of a book
  async getOneChapterOfBook(req, res) {
    try {
      const { bookId, chapterId } = req.params;

      // Optional: ensure book exists
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      const chapter = await Chapter.findOne({
        where: {
          id: chapterId,
          bookId,
        },
      });

      if (!chapter) {
        return res.status(404).json({
          error: 'Chapter not found for this book',
        });
      }

      return res.json(chapter);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  // Create a new chapter
  async createChapter(req, res) {
    try {
      const { id, title, content, order, bookId } = req.body;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Valid "id" (string) is required' });
      }

      if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Valid "title" (string) is required' });
      }

      if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: 'Valid "content" (string) is required' });
      }

      if (
        order === undefined ||
        typeof order !== 'number' ||
        !Number.isInteger(order) ||
        order < 1
      ) {
        return res.status(400).json({
          error: '"order" must be a positive integer',
        });
      }

      if (!bookId || typeof bookId !== 'string') {
        return res.status(400).json({ error: 'Valid "bookId" (string) is required' });
      }

      const existingChapter = await Chapter.findByPk(id);
      if (existingChapter) {
        return res.status(409).json({ error: 'Chapter with this id already exists' });
      }

      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(400).json({ error: 'Book not found' });
      }

      const existingOrder = await Chapter.findOne({
        where: { bookId, order },
      });

      if (existingOrder) {
        return res.status(409).json({
          error: 'A chapter with this order already exists for this book',
        });
      }

      const chapter = await Chapter.create({
        id,
        title,
        content,
        order,
        bookId,
      });

      return res.status(201).json(chapter);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete a chapter by id
  async deleteChapter(req, res) {
    try {
      const { id } = req.params;

      const deletedCount = await Chapter.destroy({ where: { id } });

      if (deletedCount === 0) {
        return res.status(404).json({ error: 'Chapter not found' });
      }

      res.json({ message: 'Chapter deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },
};
