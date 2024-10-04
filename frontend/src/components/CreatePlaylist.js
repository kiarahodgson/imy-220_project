import React, { useState } from 'react';

const CreatePlaylist = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onCreate({ title, description, songCount: 0 });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a New Playlist</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">Playlist Title:</label>
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
          <label htmlFor="description" className="block text-gray-700">Playlist Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="bg-[#AE869A] hover:bg-[#7F5EDA] text-white font-bold py-2 px-4 rounded"
        >
          Create Playlist
        </button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
