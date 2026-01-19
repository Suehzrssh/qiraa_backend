const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController.js');

router.get('/books/:bookId/chapters/:chapterId', chapterController.getOneChapterOfBook);
router.get('/books/:bookId/chapters', chapterController.getAllChaptersOfBook);
router.post('/books/:bookId/chapters', chapterController.createChapter);
router.delete('/books/:bookId/chapters/:id', chapterController.deleteChapter);



module.exports = router;