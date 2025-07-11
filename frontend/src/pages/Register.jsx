import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const handleRegister = (data) => {
    // TODO: Implement register logic
    alert(`Register: ${JSON.stringify(data)}`);
  };

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register; 