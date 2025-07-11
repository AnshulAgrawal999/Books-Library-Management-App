import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyBookCard from '../components/MyBookCard';
import { fetchMyBooks, updateBookStatus, updateBookRating } from '../features/mybooks/myBooksSlice';

const MyBooks = () => {
  const dispatch = useDispatch();
  const { myBooks, loading, error } = useSelector(state => state.mybooks);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyBooks());
    }
  }, [dispatch, user]);

  const handleStatusChange = (book, status) => {
    dispatch(updateBookStatus({ bookId: book.bookId || book._id, status }));
  };

  const handleRatingChange = (book, rating) => {
    dispatch(updateBookRating({ bookId: book.bookId || book._id, rating }));
  };

  if (!user) return <div>Please log in to view your books.</div>;
  if (loading) return <div>Loading your books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>My Books</h2>
      {myBooks.length === 0 ? (
        <div>You have no books in your list.</div>
      ) : (
        myBooks.map(book => (
          <MyBookCard
            key={book.bookId || book._id}
            book={book}
            status={book.status}
            rating={book.rating}
            onStatusChange={handleStatusChange}
            onRatingChange={handleRatingChange}
          />
        ))
      )}
    </div>
  );
};

export default MyBooks; 