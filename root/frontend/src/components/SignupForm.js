// SignupForm.js
import React, { useState } from 'react';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = { email: '', password: '', confirmPassword: '' };
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password cannot be empty';
    }
    if (confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    if (Object.values(newErrors).every(error => error === '')) {
      // Proceed with form submission
      console.log('Form submitted with:', { email, password });
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
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
