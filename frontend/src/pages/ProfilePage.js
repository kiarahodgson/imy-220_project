//u23530996 Kiara Hodgson
import React from 'react';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import PlaylistList from '../components/PlaylistList';
import FollowerList from '../components/FollowerList';
import FollowingList from '../components/FollowingList';

const ProfilePage = ({ user, playlists, followers, following }) => (
  <div className="profile-page">
    <header className="profile-header">
      <h1>{user.name}'s Profile</h1>
    </header>
    <main className="profile-main">
      <section className="profile-info">
        <Profile user={user} />
        <EditProfile user={user} />
      </section>
      <section className="playlists-section">
        <h2>Your Playlists</h2>
        <PlaylistList playlists={playlists} />
      </section>
      <section className="followers-section">
        <FollowerList followers={followers} />
      </section>
      <section className="following-section">
        <FollowingList following={following} />
      </section>
    </main>
  </div>
);

export default ProfilePage;
