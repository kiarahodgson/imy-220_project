//u23530996 Kiara Hodgson

import React, { useState } from 'react';

// handles validation for login form
const LoginForm = () => {
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = { email: '', password: '' };
    if (!validateEmail(email)) {
      newErrors.email = 'Please input a valid email address';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password must not be empty';
    }
    setErrors(newErrors);
    if (Object.values(newErrors).every(error => error === '')) {
      console.log('Form submitted using:', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        {errors.email && <p className="error-class">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-class">{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
