import React from 'react';
import PlaylistPreview from './PlaylistPreview';
import Song from './Song';

const Feed = ({ songs, playlists }) => (
  <div className="feed">
    <div className="songs-feed">
      <h3>Songs</h3>
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
    <div className="playlists-feed">
      <h3>Playlists</h3>
      {playlists.map((playlist) => (
        <PlaylistPreview key={playlist.id} playlist={playlist} />
      ))}
    </div>
  </div>
);

export default Feed;
