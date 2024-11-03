import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const SplashPage = ({ onLogin }) => {
  const handleLoginSuccess = (userData, token) => {
    onLogin(userData, token);
  };

  return (
    <div className="splash-page max-w-page mx-auto p-4">
      {/* Header Section */}
      <header className="splash-header mb-8">
        <h1>Welcome to Sonica</h1>
        <p>Your new favourite way to share playlists.</p>
      </header>

      {/* Main Content Area */}
      <main className="splash-main grid gap-8 md:grid-cols-2">
        
        {/* Information Section */}
        <section className="features-section bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Why Use Sonica?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Create and customize your playlists</li>
            <li>Share and view playlists with your friends</li>
            <li>Discover new songs that users love</li>
            <li>Interact with other users and find your music soulmates</li>
          </ul>
        </section>

        {/* Login and Signup Section */}
        <section className="auth-section bg-white p-6 rounded-lg shadow-md">
          {/* Login Section */}
          <div className="login-section mb-6">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>

          <hr className="my-4" />

          {/* Signup Section */}
          <div className="signup-section">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            <SignupForm />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SplashPage;
