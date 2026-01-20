const { Chapter, Book } = require('../models');

module.exports = {
  async getAllChaptersOfBook(req, res) {
    const chapters = await Chapter.findAll({
      where: { bookId: req.params.bookId },
      order: [['order', 'ASC']],
    });
    res.json(chapters);
  },

  async getOneChapterOfBook(req, res) {
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
  },

  async createChapter(req, res) {
    const { title, content, order } = req.body;
    const { bookId } = req.params;

    if (!title || !content || !Number.isInteger(order)) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const sameOrder = await Chapter.findOne({ where: { bookId, order } });
    if (sameOrder) {
      return res.status(409).json({ error: 'Order already exists' });
    }

    const chapter = await Chapter.create({
      title,
      content,
      order,
      bookId,
    });

    res.status(201).json(chapter);
  },

  async deleteChapter(req, res) {
    const deleted = await Chapter.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Chapter not found' });
    res.json({ message: 'Chapter deleted' });
  },
};
