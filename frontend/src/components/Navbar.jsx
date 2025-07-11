import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Placeholder for auth state
  const isLoggedIn = false;
  const userEmail = '';

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <span style={{ fontWeight: 'bold', marginRight: '2rem' }}>My Library</span>
      <Link to="/">Home</Link>
      {isLoggedIn && <Link to="/mybooks" style={{ marginLeft: '1rem' }}>My Books</Link>}
      {!isLoggedIn && <Link to="/login" style={{ marginLeft: '1rem' }}>Login</Link>}
      {!isLoggedIn && <Link to="/register" style={{ marginLeft: '1rem' }}>Register</Link>}
      {isLoggedIn && <span style={{ marginLeft: '1rem' }}>{userEmail}</span>}
      {isLoggedIn && <button style={{ marginLeft: '1rem' }}>Logout</button>}
    </nav>
  );
};

export default Navbar; 