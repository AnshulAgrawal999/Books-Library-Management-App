require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const fs = require('fs');

const seedBooks = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Read the books data
    const booksData = JSON.parse(fs.readFileSync('./books.json', 'utf8'));
    
    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert new books (booksData is now an array directly)
    const books = await Book.insertMany(booksData);
    console.log(`Seeded ${books.length} books:`);
    books.forEach(book => {
      console.log(`- ${book.title} by ${book.author}`);
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedBooks(); 