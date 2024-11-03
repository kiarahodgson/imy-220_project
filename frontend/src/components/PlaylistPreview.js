// PlaylistPreview.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import playlistDefault from '../assets/images/playlist_default.webp';

const PlaylistPreview = ({ playlist, showCreatorMessage = true }) => {
  const navigate = useNavigate();

  const handleViewPlaylist = () => {
    navigate(`/playlists/${playlist._id}`);
  };

  return (
    <div className="playlist-preview shadow-lg-purple rounded-lg p-4 bg-white">
      <img
        src={playlist.coverImage || playlistDefault}
        alt="Cover"
        loading="lazy" // Enable lazy loading for the image
        className="playlist-image rounded-md mb-4 w-full h-40 object-cover"
      />
      {showCreatorMessage ? (
        <h4 className="playlist-title text-lg font-semibold">
          {playlist.userId?.username || 'Unknown User'} created a new playlist called "{playlist.title}"
        </h4>
      ) : (
        <h4 className="playlist-title text-lg font-semibold">{playlist.title}</h4>
      )}
      <p className="playlist-description text-gray-600 mt-2">{playlist.description}</p>

      <p className="playlist-song-count text-gray-500 mt-2">
        {playlist.songCount} {playlist.songCount === 1 ? 'song' : 'songs'}
      </p>

      <button onClick={handleViewPlaylist} className="off-white-button mt-4 px-4 py-2 rounded shadow-md">
        View Playlist
      </button>
    </div>
  );
};

export default PlaylistPreview;
