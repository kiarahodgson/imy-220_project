//u23530996 Kiara Hodgson

import React from 'react';

const Playlist = ({ playlist }) => {
  if (!playlist) return <p>Playlist data empty</p>;

  return (
    <div className="playlist">
      <h2>{playlist.name}</h2>
      <p>{playlist.description}</p> {}
      <p>Number of songs: {playlist.songCount}</p>
    </div>
  );
};

export default Playlist;
