import React, { useEffect, useState } from 'react';
import CommentList from '../components/CommentList';
import AddComment from '../components/AddComment';
import Song from '../components/Song';
import { useNavigate } from 'react-router-dom';

const PlaylistPage = ({ playlistId, user }) => {
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/playlists/${playlistId}`);
        if (!response.ok) throw new Error('Failed to fetch playlist');
    
        const playlistData = await response.json();
        setPlaylist(playlistData);
        setTitle(playlistData.title);
        setDescription(playlistData.description);

        const songIds = playlistData.songIds.map(song => typeof song === 'object' ? song._id : song);
        const songDetails = await Promise.all(
          songIds.map(async (id) => {
            const songResponse = await fetch(`http://localhost:8000/api/songs/${id}`);
            if (songResponse.ok) {
              return songResponse.json();
            } else {
              console.warn(`Song with ID ${id} not found, marking as deleted.`);
              return { _id: id, title: 'Unknown', artist: 'Unknown', deleted: true };
            }
          })
        );

        setSongs(songDetails);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/comments/${playlistId}`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (playlistId) {
      fetchPlaylist();
      fetchComments();
    }
  }, [playlistId]);

  const handleDeletePlaylist = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/playlists/${playlistId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete playlist');
      
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSong = async (songId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/songs/${songId}/delete`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) throw new Error('Failed to mark song as deleted');
  
      const updatedSong = await response.json();
      setSongs((prevSongs) => prevSongs.map(song => song._id === songId ? updatedSong : song));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });

      if (!response.ok) throw new Error('Failed to update playlist');
      
      const updatedPlaylist = await response.json();
      setPlaylist(updatedPlaylist);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveSongFromPlaylist = async (songId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/playlists/${playlistId}/remove-song`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId })
      });
  
      if (!response.ok) throw new Error('Failed to remove song from playlist');
  
      const updatedPlaylist = await response.json();
      setPlaylist(updatedPlaylist);
      setSongs((prevSongs) => prevSongs.filter(song => song._id !== songId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`http://localhost:8000/api/comments/${playlistId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newComment,
          userId: user._id,
          username: user.username,
        }),
      });

      if (!response.ok) throw new Error('Failed to add comment');

      const addedComment = await response.json();
      setComments([addedComment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!playlist) return <p>Playlist not found.</p>;

  // Checks if user created playlist
  const isOwner = user && (playlist.userId === user._id || playlist.userId?._id === user._id);

  return (
    <div className="playlist-page p-4 mx-auto max-w-screen-md">
      <header className="playlist-header text-center">
        {playlist.coverImage && (
          <div className="cover-image-wrapper mb-4">
            <img
              src={playlist.coverImage}
              alt="Playlist Cover"
              className="cover-image w-full h-64 object-cover rounded-md shadow-lg"
            />
          </div>
        )}
        {isEditing ? (
          <div className="edit-form">
            <input
              className="text-lg font-semibold mb-2 text-purple-600 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="text-gray-700 mb-4 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSaveChanges} className="off-white-button">
              Save Changes
            </button>
            <button onClick={handleEditToggle} className="off-white-button">
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold">{playlist.title}</h1>
            <p className="text-gray-700 mb-4">{playlist.description}</p>
            {isOwner && (
              <div className="action-buttons mt-2 space-x-4">
<button onClick={handleEditToggle} className="off-white-button">
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

      {/* Song area */}
      <section className="song-list mt-6">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        {songs.length > 0 ? (
          songs.map((song) => (
            <Song
              key={song._id}
              song={song}
              userId={user._id}
              playlists={[]}
              onDelete={isOwner ? handleDeleteSong : null}
              onRemove={isOwner ? () => handleRemoveSongFromPlaylist(song._id) : null}
              showRemoveButton={isOwner}
              showAddToPlaylistButton={false}
            />
          ))
        ) : (
          <p>No songs available in this playlist.</p>
        )}
      </section>

      {/* playlist comments */}
      <section className="comments-section mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <CommentList comments={comments} user={user} />
        
        {user && (
          <div className="add-comment mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <button onClick={handleAddComment} className="off-white-button">
              Post Comment
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default PlaylistPage;
