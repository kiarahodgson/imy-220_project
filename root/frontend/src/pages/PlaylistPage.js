import React from 'react';
import Playlist from '../components/Playlist'; // If you want to use this component
import CommentList from '../components/CommentList';
import AddComment from '../components/AddComment';

const PlaylistPage = ({ playlists, comments }) => (
  <div className="playlist-page">
    <header className="playlist-header">
      <h1>Playlists</h1>
    </header>
    <main className="playlist-main">
      <section className="playlist-details">
        {playlists.map(playlist => (
          <div key={playlist.id} className="playlist-item">
            <h2>{playlist.name}</h2>
            <p>Number of Songs: {playlist.songCount}</p>
          </div>
        ))}
      </section>
      <section className="comments-section">
        <h2>Comments</h2>
        <CommentList comments={comments} />
        <AddComment />
      </section>
    </main>
  </div>
);

export default PlaylistPage;
