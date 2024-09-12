//u23530996 Kiara Hodgson

import React, { useState } from 'react';

const SignupForm = () => {
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = { email: '', password: '', confirmPassword: '' };
    if (!validateEmail(email)) {
      newErrors.email = 'Invalid, enter a valid email address';
    }
    if (password.trim() === '') {
      newErrors.password = 'Do not leave empty';
    }
    if (confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confrm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords are not identical';
    }
    setErrors(newErrors);
    if (Object.values(newErrors).every(error => error === '')) {
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
      <div>
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p className="error-class">{errors.confirmPassword}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
