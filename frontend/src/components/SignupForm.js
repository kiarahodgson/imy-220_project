import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '', username: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = { email: '', password: '', confirmPassword: '', username: '' };
    if (username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Invalid, enter a valid email address';
    }
    if (password.trim() === '') {
      newErrors.password = 'Do not leave empty';
    }
    if (confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords are not identical';
    }
    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => error === '')) {
      try {
        const response = await axios.post('http://localhost:8000/api/users', { username, email, password });
        setSuccessMessage(response.data.message);
        setUsername('');
        setEmailAddress('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.error('Error during signup:', error.response.data.message);
        setErrors({ ...newErrors, email: error.response.data.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmailAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>
      {successMessage && <p className="text-green-500 text-xs mt-1">{successMessage}</p>}
      <button className="bg-[#AE869A] text-white px-4 py-2 rounded hover:bg-[#6E70C1]" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
