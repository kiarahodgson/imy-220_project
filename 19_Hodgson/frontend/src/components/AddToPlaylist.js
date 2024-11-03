import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToPlaylist = ({ songId, userId, playlists }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    console.log('Current userId:', userId);
    console.log('Playlists:', playlists);
  }, [userId, playlists]);

  const userPlaylists = playlists.filter(
    (playlist) => playlist.userId === userId || playlist.userId?._id === userId
  );

  const handleAddSong = async () => {
    if (!selectedPlaylist) return;

    try {
      await axios.put(`http://localhost:8000/api/playlists/${selectedPlaylist}/add-song`, { songId });
      alert('Song added to playlist!');
      setDropdownOpen(false);
      setSelectedPlaylist('');
    } catch (error) {
      console.error('Error could not add song to playlist:', error);
    }
  };

  return (
    <div className="relative">
      <button
        className="off-white-button"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        Add to Playlist
      </button>

      {isDropdownOpen && userPlaylists.length > 0 && (
        <div className="dropdown-container absolute mt-2 w-full z-10">
          <select
            className="block w-full p-2 border border-gray-300 rounded-lg"
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
          >
            <option value="">Choose a Playlist</option>
            {userPlaylists.map((playlist) => (
              <option key={playlist._id} value={playlist._id}>
                {playlist.title}
              </option>
            ))}
          </select>
          <button
            className="off-white-button mt-2 w-full"
            onClick={handleAddSong}
            disabled={!selectedPlaylist}
          >
            Add to Selected Playlist
          </button>
        </div>
      )}

      {isDropdownOpen && userPlaylists.length === 0 && (
        <p className="text-gray-500 italic mt-2">You have no playlists to add this song to.</p>
      )}
    </div>
  );
};

export default AddToPlaylist;
