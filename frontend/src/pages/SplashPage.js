import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const SplashPage = () => (
  <div className="splash-page">
    <header className="splash-header">
      <h1>Welcome to the Playlist App</h1>
    </header>
    <main className="splash-main">
      <section className="login-section">
        <h2>Login</h2>
        <LoginForm />
      </section>
      <section className="signup-section">
        <h2>Sign Up</h2>
        <SignupForm />
      </section>
    </main>
  </div>
);

export default SplashPage;
