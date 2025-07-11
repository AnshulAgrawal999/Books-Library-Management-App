import React from 'react';

const MyBookCard = ({ book, status, rating, onStatusChange, onRatingChange }) => {
  return (
    <div>
      <img src={book.coverImage} alt={book.title} width={100} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <div>
        <label>Status: </label>
        <select value={status} onChange={e => onStatusChange(book, e.target.value)}>
          <option value="Want to Read">Want to Read</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Read">Read</option>
        </select>
      </div>
      <div>
        <label>Rating: </label>
        <select value={rating} onChange={e => onRatingChange(book, Number(e.target.value))}>
          <option value={0}>No rating</option>
          {[1,2,3,4,5].map(star => (
            <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MyBookCard; 