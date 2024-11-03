import React, { useState } from 'react';

const AddSong = ({ onAddSong }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && artist && link) {
      onAddSong({ title, artist, link });
      setTitle('');
      setArtist('');
      setLink('');
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add a New Song</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">Song Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="artist" className="block text-gray-700">Artist:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="link" className="block text-gray-700">Spotify Link:</label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="off-white-button"
        >
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSong;
