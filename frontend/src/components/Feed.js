import React from 'react';
import PlaylistPreview from './PlaylistPreview';
import Song from './Song';

const Feed = ({ songs, playlists, userId }) => {
  if (!songs.length && !playlists.length) {
    return <div>Loading...</div>; // Handles when no data is received
  }

  return (
    <div className="p-4 space-y-6">
      <div className="feed-songs">
        <h3 className="text-2xl font-bold">Songs</h3>
        {songs.length > 0 ? (
          songs.map((song) => (
            <Song key={song._id} song={song} playlists={playlists} userId={userId} />
          ))
        ) : (
          <p>No songs found</p>
        )}
      </div>
      <div className="feed-playlists">
        <h3 className="text-2xl font-bold">Playlists</h3>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <PlaylistPreview key={playlist._id} playlist={playlist} />
          ))
        ) : (
          <p>No playlists found</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
