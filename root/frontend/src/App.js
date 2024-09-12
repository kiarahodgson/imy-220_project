import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PlaylistPage from './pages/PlaylistPage';

// Dummy Data
const dummySongs = [
  { id: 1, name: 'Song One', artist: 'Artist A' },
  { id: 2, name: 'Song Two', artist: 'Artist B' },
];

const dummyPlaylists = [
  { id: 1, name: 'Chill Vibes', description: 'Relaxing tunes for a calm mood' },
  { id: 2, name: 'Hype', description: 'Going clubbing tonight' },
];

const dummyComments = [
  { id: 1, author: 'User1', content: 'Great song!', timestamp: '2024-09-11' },
  { id: 2, author: 'User2', content: 'Love it!', timestamp: '2024-09-12' },
];

const dummyProfiles = [
  {
    id: 1,
    name: 'John Doe',
    bio: 'Music lover',
    playlists: dummyPlaylists,
    followers: [
      { id: 1, name: 'Shan' },
      { id: 2, name: 'Billy' }
    ],
    following: [
      { id: 1, name: 'Tom' },
      { id: 2, name: 'Holland' }
    ]
  }
];

const getProfileById = (id) => dummyProfiles.find(profile => profile.id === parseInt(id)) || dummyProfiles[0];
const getPlaylistById = (id) => dummyPlaylists.find(playlist => playlist.id === parseInt(id)) || dummyPlaylists[0];

const ProfilePageWithParams = () => {
  const { id } = useParams();
  const profile = getProfileById(id);
  return <ProfilePage user={profile} playlists={dummyPlaylists} followers={profile.followers} following={profile.following} />;
};

const PlaylistPageWithParams = () => {
  const { id } = useParams();
  const playlist = getPlaylistById(id);
  return <PlaylistPage playlist={playlist} comments={dummyComments} />;
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
      <Route path="/profile/:id" element={<ProfilePageWithParams />} />
      <Route path="/playlists" element={<PlaylistPage playlist={dummyPlaylists[0]} comments={dummyComments} />} />
      <Route path="/playlists/:id" element={<PlaylistPageWithParams />} />
    </Routes>
  </Router>
);

export default App;
