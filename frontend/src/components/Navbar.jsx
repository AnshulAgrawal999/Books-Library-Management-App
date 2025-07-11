import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <span style={{ fontWeight: 'bold', marginRight: '2rem' }}>My Library</span>
      <Link to="/">Home</Link>
      {user && <Link to="/mybooks" style={{ marginLeft: '1rem' }}>My Books</Link>}
      {!user && <Link to="/login" style={{ marginLeft: '1rem' }}>Login</Link>}
      {!user && <Link to="/register" style={{ marginLeft: '1rem' }}>Register</Link>}
      {user && <span style={{ marginLeft: '1rem' }}>{user.email}</span>}
      {user && <button style={{ marginLeft: '1rem' }} onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
