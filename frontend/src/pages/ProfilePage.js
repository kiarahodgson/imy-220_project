import React, { useEffect, useState } from 'react';
import CommentList from '../components/CommentList';
import AddComment from '../components/AddComment';

const ProfilePage = ({ comments = [], user }) => {
  const [allPlaylists, setAllPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/playlists/user/${user._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }
        const userPlaylists = await response.json();
        setAllPlaylists(userPlaylists);
      } catch (error) {
        console.error(error);
      }
    };

    if (user && user._id) {
      fetchPlaylists();
    }
  }, [user]);

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>{user ? `${user.username}'s Profile` : 'Profile'}</h1>
      </header>
      <main className="profile-main">
        <section className="playlist-details grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {allPlaylists.length > 0 ? (
            allPlaylists.map((playlist) => (
              <div
                key={playlist._id}
                className="playlist-item bg-white p-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-bold mb-2 text-purple-600">{playlist.title}</h2>
                <p className="text-gray-700 mb-4">{playlist.description}</p>
                <p className="text-gray-500">Number of Songs: {playlist.songCount}</p>
              </div>
            ))
          ) : (
            <p>No playlists available.</p>
          )}
        </section>
        <section className="comments-section mt-8">
          <h2>Comments</h2>
          {comments.length > 0 ? (
            <CommentList comments={comments} />
          ) : (
            <p>Nothing to see here</p>
          )}
          <AddComment />
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
