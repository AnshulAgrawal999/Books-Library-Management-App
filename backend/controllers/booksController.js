const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    let books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 