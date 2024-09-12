import React from 'react';
import PlaylistPreview from './PlaylistPreview'; 

const PlaylistList = ({ playlists }) => (
  <div className="playlist-list">
    {playlists.length > 0 ? (
      playlists.map(playlist => <PlaylistPreview key={playlist.id} playlist={playlist} />)
    ) : (
      <p>No playlists</p>
    )}
  </div>
);

export default PlaylistList;
