const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController.js');

router.get('/:id/read', bookController.readFullBook);
router.get('/:id', bookController.getBookById);
router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
