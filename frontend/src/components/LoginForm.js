import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = { email: '', password: '' };
    if (!validateEmail(email)) {
      newErrors.email = 'Please use a proper email address';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password can not be void';
    }
    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => error === '')) {
      try {
        const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
        const userData = response.data.user;
        onLogin(userData);
        setSuccessMessage('Logged in successfully!');
      } catch (error) {
        console.error('Error during login:', error.response.data.message);
        setErrors({ ...newErrors, email: error.response.data.message });
      }
    }
  };

  return (
    <form className="space-y-4 p-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={email}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          id="password"
          className="w-full border border-gray-300 rounded-lg p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>
      {successMessage && <p className="text-[#6E70C1] text-xs mt-1">{successMessage}</p>}
      <button className="bg-[#AE869A] text-white px-4 py-2 rounded hover:bg-[#6E70C1]" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
