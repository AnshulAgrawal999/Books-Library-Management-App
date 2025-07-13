const MyBook = require('../models/MyBook');
const Book = require('../models/Book');

exports.getMyBooks = async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.user.id }).populate('bookId');
    res.json(myBooks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.addBookToMyBooks = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if already in user's list
    const existingMyBook = await MyBook.findOne({ userId, bookId });
    if (existingMyBook) {
      return res.status(409).json({ message: 'Book already in your list' });
    }
    
    const myBook = new MyBook({ userId, bookId });
    await myBook.save();
    
    const populatedMyBook = await MyBook.findById(myBook._id).populate('bookId');
    res.status(201).json(populatedMyBook);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    
    if (!['Want to Read', 'Currently Reading', 'Read'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const myBook = await MyBook.findOneAndUpdate(
      { userId, bookId },
      { status },
      { new: true }
    ).populate('bookId');
    
    if (!myBook) {
      return res.status(404).json({ message: 'Book not found in your list' });
    }
    
    res.json(myBook);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;
    
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return res.status(400).json({ message: 'Rating must be an integer between 1 and 5' });
    }
    
    const myBook = await MyBook.findOneAndUpdate(
      { userId, bookId },
      { rating },
      { new: true }
    ).populate('bookId');
    
    if (!myBook) {
      return res.status(404).json({ message: 'Book not found in your list' });
    }
    
    res.json(myBook);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 