import React from 'react';

const PlaylistList = ({ playlists = [] }) => {
  return (
    <div className="playlist-list">
      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        playlists.map((playlist) => (
          <div key={playlist._id} className="playlist-item">
            <h3>{playlist.title}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default PlaylistList;
