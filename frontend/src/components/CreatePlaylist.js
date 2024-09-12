//u23530996 Kiara Hodgson

import React, { useState } from 'react';

const CreatePlaylist = ({ playCreate }) => {
  const [name, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      playCreate({ name, description, songCount: 0 });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="playlist-creation">
      <h2>Create a New Playlist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Playlist Name:</label>
          <input
            type="text"
            id="title"
            value={name}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Playlist Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
