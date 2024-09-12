import React from 'react';

const PlaylistPreview = ({ playlist }) => (
  <div className="playlist-preview">
    <h4>{playlist.name}</h4>
    <p>{playlist.description}</p>
  </div>
);

export default PlaylistPreview;
