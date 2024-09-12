//u23530996 Kiara Hodgson

import React from 'react';

const Playlist = ({ playlist }) => {
  if (!playlist) return <p>No playlist data, add a playlist and review them here</p>;

  return (
    <div className="playlist">
      <h2>{playlist.name}</h2>
      <p>Number of songs: {playlist.songCount}</p>
    </div>
  );
};

export default Playlist;
