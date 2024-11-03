// Song.js
import React, { useState } from 'react';
import AddToPlaylist from './AddToPlaylist';

const Song = ({ song, playlists, userId, onDelete, onRemove, showRemoveButton, showAddToPlaylistButton }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(song.deleted);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      // Mark the song as deleted visually
      setIsDeleted(true);

      const response = await fetch(`http://localhost:8000/api/songs/${song._id}/delete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark song as deleted');
      }

      // Call the onDelete function to remove the song from parent component
      onDelete(song._id);
    } catch (error) {
      console.error('Error deleting song:', error);
    } finally {
      setShowConfirm(false);
    }
  };

  const renderSpotifyEmbed = (url) => {
    if (typeof url !== 'string' || !url.includes('/track/') || isDeleted) {
      return <p className="text-gray-500">Spotify embed unavailable</p>;
    }

    const trackId = url.split('/track/')[1]?.split('?')[0];
    return (
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
        title="Spotify"
        className="my-2"
      ></iframe>
    );
  };

  return (
    <div className="song-wrapper">
      <div className={`song-container relative bg-white rounded-lg shadow-lg-purple p-4 ${isDeleted ? 'opacity-50' : ''}`}>
        
        {/* Delete Button in the Top-Right Corner */}
        {!isDeleted && onDelete && (
          <button
            onClick={handleDeleteClick}
            className="absolute top-2 right-2 text-red-500 text-sm underline hover:text-red-700"
          >
            Delete
          </button>
        )}

        {showRemoveButton && onRemove && !isDeleted && (
          <button
            onClick={onRemove}
            className="absolute top-10 right-2 text-red-500 text-sm underline hover:text-red-700"
          >
            Remove from Playlist
          </button>
        )}

        <h3 className="text-xl font-semibold">{song.title || 'Unknown Song'}</h3>
        <p className="text-gray-600">Artist: {song.artist || 'Unknown Artist'}</p>
        <p className="text-gray-600">Added on: {song.dateAdded ? new Date(song.dateAdded).toLocaleDateString() : 'Unknown Date'}</p>

        {isDeleted ? (
          <p className="text-red-500 italic">This song has been deleted.</p>
        ) : (
          song.link && renderSpotifyEmbed(song.link)
        )}

        {showAddToPlaylistButton && playlists && playlists.length > 0 && !isDeleted && (
          <AddToPlaylist songId={song._id} userId={userId} playlists={playlists} />
        )}

        {showConfirm && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <p className="text-gray-700 mb-4">Are you sure you want to delete this song?</p>
              <button
                onClick={confirmDelete}
                className="off-white-button bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded mr-2"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="off-white-button bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Song;
