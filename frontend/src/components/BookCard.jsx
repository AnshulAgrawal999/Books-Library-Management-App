import React from 'react';

const BookCard = ({ book, onWantToRead }) => {
  return (
    <div>
      <img src={book.coverImage} alt={book.title} width={100} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={() => onWantToRead(book)}>Want to Read</button>
    </div>
  );
};

export default BookCard; 