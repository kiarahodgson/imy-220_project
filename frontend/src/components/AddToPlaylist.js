import React, { useState } from 'react';
import axios from 'axios';

const AddToPlaylist = ({ songId, userId, playlists }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleAddSong = async () => {

    try {
      if (selectedPlaylist) {
        const response = await axios.put(`http://localhost:8000/api/playlists/${selectedPlaylist}/add-song`, { songId });
        alert('Song added to playlist!');

        // Automatically closes dropdown after song has been added to playlist
        setDropdownOpen(false);
        setSelectedPlaylist('');
      }
    } catch (error) {
      console.error('Error could not add song to playlist:', error);
    }
  };

  return (
    <div className="relative">
      <button
        className="bg-[#AE869A] hover:bg-[#7F5EDA] text-white font-bold py-2 px-4 rounded"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        Add to Playlist
      </button>

      {isDropdownOpen && playlists.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <select
            className="block w-full p-2 border border-gray-300 rounded-lg"
            value={selectedPlaylist}
            onChange={(e) => {
              setSelectedPlaylist(e.target.value);
            }}
          >
            <option value="">Choose a Playlist</option>
            {playlists.map((playlist) => (
              <option key={playlist._id} value={playlist._id}>
                {playlist.title}
              </option>
            ))}
          </select>
          <button
            className="bg-[#AE869A] hover:bg-[#7F5EDA] text-white font-bold py-2 px-4 mt-2 w-full rounded"
            onClick={handleAddSong}
            disabled={!selectedPlaylist}
          >
            Add to Selected Playlist
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToPlaylist;
