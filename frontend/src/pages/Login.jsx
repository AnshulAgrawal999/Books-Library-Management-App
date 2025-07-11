import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const handleLogin = (data) => {
    // TODO: Implement login logic
    alert(`Login: ${JSON.stringify(data)}`);
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login; 