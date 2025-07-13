import React from 'react';

const MyBookCard = ({ book, status, rating, onStatusChange, onRatingChange }) => {
  // Check if book exists and has required properties
  if (!book || !book.title || !book.author || !book.coverImage) {
    return (
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        maxWidth: '300px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#f8f9fa'
      }}>
        <p>Book information not available</p>
      </div>
    );
  }

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px',
      maxWidth: '300px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img 
        src={book.coverImage} 
        alt={book.title} 
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3 style={{ margin: '12px 0 8px 0', fontSize: '18px' }}>{book.title}</h3>
      <p style={{ margin: '0 0 16px 0', color: '#666' }}>{book.author}</p>
      
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Status: </label>
        <select 
          value={status} 
          onChange={e => onStatusChange(book, e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        >
          <option value="Want to Read">Want to Read</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Read">Read</option>
        </select>
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Rating: </label>
        <select 
          value={rating} 
          onChange={e => onRatingChange(book, Number(e.target.value))}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        >
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