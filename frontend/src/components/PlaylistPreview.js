import React from 'react';

const PlaylistPreview = ({ playlist }) => (
  <div className="p-4 border rounded-md shadow-md">
    <h4 className="text-lg font-semibold">{playlist.name}</h4>
    <p className="text-gray-600">{playlist.description}</p>
  </div>
);

export default PlaylistPreview;
