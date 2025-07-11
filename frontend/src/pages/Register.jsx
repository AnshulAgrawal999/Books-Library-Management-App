import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(state => state.auth);

  React.useEffect(() => {
    if (user) navigate('/mybooks');
  }, [user, navigate]);

  const handleRegister = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleRegister} />
      {loading && <div>Registering...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Register; 