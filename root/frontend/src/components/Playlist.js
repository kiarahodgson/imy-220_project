import React from 'react';

const Playlist = ({ playlist }) => {
  if (!playlist) return <p>No playlist data</p>;

  return (
    <div className="playlist">
      <h2>{playlist.name}</h2>
      <p>Number of songs: {playlist.songCount}</p>
    </div>
  );
};

export default Playlist;
