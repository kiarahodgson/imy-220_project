import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Song from './Song';

const Playlist = ({ playlist, userId, isAdmin, onAddSongToPlaylist }) => {
  const [playlistData, setPlaylistData] = useState(playlist);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(playlistData.title);
  const [newDescription, setNewDescription] = useState(playlistData.description);
  const [newHashtag, setNewHashtag] = useState('');
  const navigate = useNavigate();

  const isOwnerOrAdmin = isAdmin || userId === playlistData.userId;

  const handleAddHashtag = () => {
    if (newHashtag) {
      setPlaylistData((prev) => ({
        ...prev,
        hashtags: [...prev.hashtags, `#${newHashtag}`],
      }));
      setNewHashtag('');
    }
  };

  const handleAddSongToPlaylist = (songId) => {
    onAddSongToPlaylist(songId, playlistData._id);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/playlists/${playlistData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription })
      });

      if (!response.ok) throw new Error('Failed to update playlist');

      const updatedPlaylist = await response.json();
      setPlaylistData(updatedPlaylist);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePlaylist = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/playlists/${playlistData._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete playlist');
      
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="playlist-page p-4">
      <header className="playlist-header">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-lg font-semibold mb-2"
              placeholder="Title"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="text-gray-700 mb-4 w-full"
              placeholder="Description"
            />
            <button onClick={handleSaveChanges} className="off-white-button">
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="off-white-button ml-2">
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h1>{playlistData.title}</h1>
            <p>Genre: {playlistData.genre}</p>
            <img src={playlistData.coverImage} alt="Cover" className="cover-image my-4" />
            <p>{playlistData.description}</p>
            {isOwnerOrAdmin && (
              <div className="flex space-x-2 mt-4">
                <button onClick={() => setIsEditing(true)} className="off-white-button">
                  Edit
                </button>
                <button onClick={handleDeletePlaylist} className="off-white-button">
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </header>

      <div className="hashtags mt-4">
        {playlistData.hashtags.map((tag, index) => (
          <span key={index} className="hashtag text-blue-500 cursor-pointer">
            {tag}
          </span>
        ))}
        <input
          type="text"
          value={newHashtag}
          onChange={(e) => setNewHashtag(e.target.value)}
          placeholder="Add hashtag"
          className="border border-gray-300 p-1 rounded mt-2"
        />
        <button onClick={handleAddHashtag} className="off-white-button ml-2">
          Add Hashtag
        </button>
      </div>

      <div className="songs-list mt-6">
        {playlistData.songs.map((song) => (
          <Song
            key={song._id}
            song={song}
            userId={userId}
            showRemoveButton={isOwnerOrAdmin}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
