//u23530996 Kiara Hodgson
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PlaylistPage from './pages/PlaylistPage';
import { getProfileById, getPlaylistById, dummyProfiles, dummyPlaylists, dummyComments, dummySongs } from './dumdat';

const ProfilePageParams = () => {
  const { id } = useParams();
  const profile = getProfileById(id);
  
  if (!profile) {
    return <p>Profile not found.</p>;
  }
  
  return (
    <ProfilePage
      user={profile}
      playlists={dummyPlaylists}
      followers={profile.followers}
      following={profile.following}
    />
  );
};

const PlaylistPageParams = () => {
  const { id } = useParams();
  const playlist = getPlaylistById(id);
  
  if (!playlist) {
    return <p>Playlist not found.</p>;
  }

  return (
    <PlaylistPage
      playlists={[playlist]}
      comments={dummyComments}
    />
  );
};

const HomePageWithData = () => (
  <HomePage songs={dummySongs} playlists={dummyPlaylists} />
);

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/home" element={<HomePageWithData />} />
      <Route path="/profile" element={<ProfilePage user={dummyProfiles[0]} playlists={dummyPlaylists} followers={dummyProfiles[0].followers} following={dummyProfiles[0].following} />} />
      <Route path="/profile/:id" element={<ProfilePageParams />} />
      <Route path="/playlists" element={<PlaylistPage playlists={dummyPlaylists} comments={dummyComments} />} />
      <Route path="/playlists/:id" element={<PlaylistPageParams />} />
    </Routes>
  </Router>
);


export default App;
