import React from 'react';

const BookCard = ({ book, onWantToRead }) => {
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
      <button 
        onClick={() => onWantToRead(book)}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Want to Read
      </button>
    </div>
  );
};

export default BookCard; 