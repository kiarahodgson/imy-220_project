import React from 'react';

const Playlist = ({ playlist }) => (
  <div className="p-4 border rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-2">{playlist.name}</h2>
    <p className="text-gray-700">{playlist.description}</p>
    <p className="mt-4 font-semibold">{playlist.songCount} songs</p>
  </div>
);

export default Playlist;
