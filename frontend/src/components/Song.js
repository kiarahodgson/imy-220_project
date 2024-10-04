import React from 'react';
import AddToPlaylist from './AddToPlaylist';

const Song = ({ song, playlists, userId }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-xl font-semibold">{song.title}</h3>
      <p className="text-gray-600">Artist: {song.artist}</p>
      <p className="text-gray-600">Album: {song.album}</p>
      <p className="text-gray-600">Genre: {song.genre}</p>
      <AddToPlaylist songId={song._id} userId={userId} playlists={playlists} />
    </div>
  );
};

export default Song;
