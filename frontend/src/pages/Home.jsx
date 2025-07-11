import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import { fetchBooks } from '../features/books/booksSlice';
import { addBookToMyBooks } from '../features/mybooks/myBooksSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector(state => state.books);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleWantToRead = (book) => {
    if (!user) {
      alert('Please log in to add books to your list.');
      return;
    }
    dispatch(addBookToMyBooks(book._id));
  };

  const booksArray = Array.isArray(books) ? books : [];

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Book List</h2>
      {booksArray.length === 0 ? (
        <div>No books found.</div>
      ) : (
        booksArray.map(book => (
          <BookCard key={book._id} book={book} onWantToRead={handleWantToRead} />
        ))
      )}
    </div>
  );
};

export default Home; 