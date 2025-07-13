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
    // Find the myBook entry that contains this book
    const myBookEntry = myBooks.find(myBook => myBook.bookId && myBook.bookId._id === book._id);
    if (myBookEntry) {
      dispatch(updateBookStatus({ bookId: book._id, status }));
    }
  };

  const handleRatingChange = (book, rating) => {
    // Find the myBook entry that contains this book
    const myBookEntry = myBooks.find(myBook => myBook.bookId && myBook.bookId._id === book._id);
    if (myBookEntry) {
      dispatch(updateBookRating({ bookId: book._id, rating }));
    }
  };

  if (!user) return <div>Please log in to view your books.</div>;
  if (loading) return <div>Loading your books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>My Books</h2>
      {myBooks.length === 0 ? (
        <div>You have no books in your list.</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {myBooks.map(myBook => {
            // Check if bookId exists and is populated
            if (!myBook.bookId) {
              return (
                <div key={myBook._id} style={{ 
                  border: '1px solid #ddd', 
                  padding: '16px', 
                  borderRadius: '8px',
                  backgroundColor: '#f8f9fa'
                }}>
                  <p>Book data not available</p>
                </div>
              );
            }
            
            return (
              <MyBookCard
                key={myBook._id}
                book={myBook.bookId} // The book details are nested in bookId
                status={myBook.status || 'Want to Read'}
                rating={myBook.rating || 0}
                onStatusChange={handleStatusChange}
                onRatingChange={handleRatingChange}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBooks; 