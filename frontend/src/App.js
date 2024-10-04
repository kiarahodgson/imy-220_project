import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PlaylistPage from './pages/PlaylistPage';

// Fetches profile based on URL
const ProfilePageParams = () => {
  const { id } = useParams();
  const profile = getProfileById(id);

  if (!profile) {
    return <p>Profile not found.</p>;
  }

  return (
    <ProfilePage user={profile} />
  );
};

// Fetches playlist based on URL
const PlaylistPageParams = () => {
  const { id } = useParams();
  const playlist = getPlaylistById(id);

  if (!playlist) {
    return <p>Playlist not found.</p>;
  }

  return (
    <PlaylistPage playlists={[playlist]} />
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<SplashPage onLogin={handleLogin} />} />
        <Route path="/home" element={<HomePage user={user} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/profile/:id" element={<ProfilePageParams />} />
        <Route path="/playlists" element={<PlaylistPage user={user} />} />
        <Route path="/playlists/:id" element={<PlaylistPageParams />} />
      </Routes>
    </Router>
  );
};

export default App;
