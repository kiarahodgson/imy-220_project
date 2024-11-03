import React from 'react';

const EditPlaylist = () => (
  <form className="space-y-4">
    <input
      type="text"
      placeholder="Rename Playlist"
      className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
    />
    <button
      type="submit"
      className="off-white-button"
    >
      Submit Changes
    </button>
  </form>
);

export default EditPlaylist;
