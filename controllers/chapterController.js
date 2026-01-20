const { Chapter, Book } = require('../models');

module.exports = {

  // GET /books/:bookId/chapters
  async getAllChaptersOfBook(req, res) {
    try {
      const chapters = await Chapter.findAll({
        where: { bookId: req.params.bookId },
        order: [['order', 'ASC']],
      });

      res.json(chapters);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // GET /books/:bookId/chapters/:chapterId
  async getOneChapterOfBook(req, res) {
    try {
      const chapter = await Chapter.findOne({
        where: {
          id: req.params.chapterId,
          bookId: req.params.bookId,
        },
      });

      if (!chapter) {
        return res.status(404).json({ error: 'Chapter not found' });
      }

      res.json(chapter);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // POST /books/:bookId/chapters
  async createChapter(req, res) {
    try {
      const { id, title, content, order } = req.body;
      const { bookId } = req.params;

      if (!id || !title || !content || !Number.isInteger(order)) {
        return res.status(400).json({ error: 'Invalid data' });
      }

      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      const sameOrder = await Chapter.findOne({
        where: { bookId, order },
      });

      if (sameOrder) {
        return res.status(409).json({
          error: 'Order already exists for this book',
        });
      }

      const chapter = await Chapter.create({
        id,
        title,
        content,
        order,
        bookId,
      });

      res.status(201).json(chapter);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // DELETE /chapters/:id
  async deleteChapter(req, res) {
    try {
      const deleted = await Chapter.destroy({
        where: { id: req.params.id },
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Chapter not found' });
      }

      res.json({ message: 'Chapter deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },
};
