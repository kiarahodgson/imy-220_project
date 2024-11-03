import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Header from './components/Header';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PlaylistPage from './pages/PlaylistPage';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

if (module.hot) {
  module.hot.accept();
}

const ProfilePageParams = ({ loggedInUserId }) => {
  const { id } = useParams();
  const isViewingOwnProfile = loggedInUserId === id;
  return <ProfilePage userId={id} loggedInUserId={loggedInUserId} isViewingOwnProfile={isViewingOwnProfile} />;
};

const PlaylistPageParams = ({ user }) => {
  const { id: playlistId } = useParams();
  return user ? <PlaylistPage playlistId={playlistId} user={user} /> : <Navigate to="/" />;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const fetchUserFromToken = async (token) => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/verify-token', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to authenticate token');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error restoring session:', error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expiry = decodedToken.exp * 1000;
        if (Date.now() >= expiry) {
          handleLogout();
          setLoading(false);
        } else {
          fetchUserFromToken(token);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // shows the loading text when still loading
  }

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<SplashPage onLogin={handleLogin} />} />
        <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}><HomePage user={user} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProfilePage userId={user?._id} loggedInUserId={user?._id} isViewingOwnProfile={true} /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProfilePageParams loggedInUserId={user?._id} /></ProtectedRoute>} />
        <Route path="/playlists" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PlaylistPage user={user} /></ProtectedRoute>} />
        <Route path="/playlists/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PlaylistPageParams user={user} /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
