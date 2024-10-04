import React from 'react';

const AddSong = () => (
  <form className="space-y-4">
    <input
      type="text"
      placeholder="Title"
      className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
    />
    <input
      type="text"
      placeholder="Artist"
      className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
    />
    <input
      type="text"
      placeholder="Length"
      className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
    />
    <button
      type="submit"
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
    >
      Add Song!
    </button>
  </form>
);

export default AddSong;
