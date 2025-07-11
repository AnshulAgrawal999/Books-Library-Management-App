const express = require('express');
const router = express.Router();
const myBooksController = require('../controllers/myBooksController');
const auth = require('../middleware/auth');

router.get('/', auth, myBooksController.getMyBooks);
router.post('/:bookId', auth, myBooksController.addBookToMyBooks);
router.patch('/:bookId/status', auth, myBooksController.updateStatus);
router.patch('/:bookId/rating', auth, myBooksController.updateRating);

module.exports = router; 