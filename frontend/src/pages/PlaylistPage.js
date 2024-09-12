import React, { useState } from 'react';
import CommentList from '../components/CommentList';
import AddComment from '../components/AddComment';
import CreatePlaylist from '../components/CreatePlaylist';

const PlaylistPage = ({ playlists = [], comments = [] }) => {
  const [allPlaylists, setAllPlaylists] = useState(playlists);

  const handleCreatePlaylist = (newPlaylist) => {
    const newId = allPlaylists.length ? Math.max(allPlaylists.map(p => p.id)) + 1 : 1;
    setAllPlaylists([...allPlaylists, { ...newPlaylist, id: newId }]);
  };

  return (
    <div className="playlist-page">
      <header className="playlist-header">
        <h1>Playlists</h1>
      </header>
      <main className="playlist-main">
        <section className="create-playlist">
          <CreatePlaylist onCreate={handleCreatePlaylist} />
        </section>
        <section className="playlist-details">
          {allPlaylists.length > 0 ? (
            allPlaylists.map((playlist) => (
              <div key={playlist.id} className="playlist-item">
                <h2>{playlist.name}</h2>
                <p>{playlist.description}</p>
                <p>Number of Songs: {playlist.songCount}</p>
              </div>
            ))
          ) : (
            <p>No playlists available.</p>
          )}
        </section>
        <section className="comments-section">
          <h2>Comments</h2>
          {comments.length > 0 ? (
            <CommentList comments={comments} />
          ) : (
            <p>Nothing here yet.</p>
          )}
          <AddComment />
        </section>
      </main>
    </div>
  );
};

export default PlaylistPage;
