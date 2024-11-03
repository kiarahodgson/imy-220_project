import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const SplashPage = ({ onLogin }) => {
  const handleLoginSuccess = (userData, token) => {
    onLogin(userData, token);
  };

  return (
    <div className="splash-page">
      <header className="splash-header">
        <h1>Welcome to Sonica</h1>
        <p>Your new favourite way to share playlists.</p>
      </header>
      <main className="splash-main">
        {/* information area */}
        <section className="features-section">
          <h2>Why Use Sonica?</h2>
          <ul>
            <li>You can create and customize your playlists</li>
            <li>Share and view playlists with your friends</li>
            <li>Discover new songs that users love</li>
            <li>Interact with other users and find your music soulmates</li>
          </ul>
        </section>

        {/* Login area */}
        <section className="login-section">
          <h2>Login</h2>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </section>

        {/* Signup area */}
        <section className="signup-section">
          <h2>Sign Up</h2>
          <SignupForm />
        </section>
      </main>
    </div>
  );
};

export default SplashPage;
