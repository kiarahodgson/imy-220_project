import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Feed from '../components/Feed';
import AddSong from '../components/AddSong';
import SearchInput from '../components/SearchInput';
import CreatePlaylist from '../components/CreatePlaylist';
import PlaylistPreview from '../components/PlaylistPreview';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [searchResults, setSearchResults] = useState({ users: [], songs: [], playlists: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('songs');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'songs' && !isSearching) {
      const fetchSongs = async () => {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:8000/api/songs');
          if (!response.ok) throw new Error('Failed to fetch songs');
          const data = await response.json();
          setSongs(data);
          setFilteredSongs(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchSongs();
    }
  }, [activeTab, isSearching]);

  useEffect(() => {
    if (user && !isSearching) {
      const fetchUserPlaylists = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8000/api/playlists/user/${user.userId}`);
          if (!response.ok) throw new Error('Failed to fetch user playlists');
          const data = await response.json();
          setUserPlaylists(data);
          setPlaylists(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUserPlaylists();
    }
  }, [user, isSearching]);

  useEffect(() => {
    const fetchFriendPlaylists = async () => {
      if (!user || !user.friends) return;

      try {
        const friendPlaylists = await Promise.all(
          user.friends.map(async (friendId) => {
            const response = await fetch(`http://localhost:8000/api/playlists/user/${friendId}`);
            return response.ok ? response.json() : [];
          })
        );
        setPlaylists(friendPlaylists.flat());
      } catch (error) {
        console.error('Error fetching friend playlists:', error);
      }
    };

    fetchFriendPlaylists();
  }, [user]);

  const onDeleteSong = (songId) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song._id === songId ? { ...song, deleted: true } : song
      )
    );
  };

  const onAddSong = async (newSong) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to add a song');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newSong, addedBy: user.userId }),
      });

      if (!response.ok) throw new Error('Failed to add');
      const savedSong = await response.json();
      setSongs((prevSongs) => [savedSong, ...prevSongs]);
      setFilteredSongs((prevSongs) => [savedSong, ...prevSongs]);
    } catch (error) {
      setError(error.message);
    }
  };

  const onCreatePlaylist = async (newPlaylist) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to create a playlist');
      return;
    }

    const payload = {
      title: newPlaylist.title,
      description: newPlaylist.description,
      category: newPlaylist.category,
      hashtags: newPlaylist.hashtags,
      coverImage: newPlaylist.coverImage,
      userId: user.userId,
    };

    try {
      const response = await fetch('http://localhost:8000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create playlist');
      }

      const savedPlaylist = await response.json();
      setUserPlaylists((prevPlaylists) => [savedPlaylist, ...prevPlaylists]);
      setPlaylists((prevPlaylists) => [savedPlaylist, ...prevPlaylists]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = async (query) => {
    setIsSearching(!!query);
    if (!query) {
      setSearchResults({ users: [], songs: [], playlists: [] });
      setFilteredSongs(songs);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('could not fetch search results');
      const results = await response.json();
      setSearchResults(results);

      setFilteredSongs(songs.filter(song => results.songs.some(result => result._id === song._id)));
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('could not fetch search results');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page p-6 md:p-8 lg:p-10">
      <header className="home-head mb-6 max-w-page mx-auto">
        <h1 className="mb-4 text-3xl font-semibold text-gray-800">Search for Users, Playlists, and songs</h1>
      </header>

      <main className="home-main max-w-page mx-auto">
        {/* Search area */}
        <section className="search-section mb-6">
          <div className="shadow-lg-purple rounded-lg p-6 bg-white">
            <SearchInput onSearch={handleSearch} />
          </div>
        </section>

        {isSearching ? (
          <section className="search-results mt-4 space-y-6">
            {searchResults.users.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Users</h3>
                {searchResults.users.map((user) => (
                  <Link key={user._id} to={`/profile/${user._id}`} className="text-blue-500 hover:underline">
                    {user.name || user.username}
                  </Link>
                ))}
              </div>
            )}

            {searchResults.songs.length > 0 && (
              <section className="mt-6 shadow-lg-purple rounded-lg p-6 bg-white">
                <h3 className="text-xl font-semibold mb-4">Songs</h3>
                <Feed
                  songs={filteredSongs}
                  playlists={[]}
                  userPlaylists={userPlaylists}
                  userId={user.userId}
                  onDeleteSong={onDeleteSong}
                  activeTab="songs"
                />
              </section>
            )}

            {searchResults.playlists.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Playlists</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.playlists.map((playlist) => (
                    <PlaylistPreview key={playlist._id} playlist={playlist} />
                  ))}
                </div>
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="shadow-lg-purple rounded-lg p-6 bg-white">
                <AddSong onAddSong={onAddSong} />
              </div>
              <div className="shadow-lg-purple rounded-lg p-6 bg-white">
                <CreatePlaylist onCreate={onCreatePlaylist} totalPlaylists={userPlaylists.length} />
              </div>
            </section>

            <div className="tab-switcher flex justify-center space-x-4 mt-4 mb-6">
              <button
                className={`off-white-button ${activeTab === 'songs' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveTab('songs')}
              >
                Song Feed
              </button>
              <button
                className={`off-white-button ${activeTab === 'playlists' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveTab('playlists')}
              >
                Playlist Feed
              </button>
            </div>

            <section className="mt-6 shadow-lg-purple rounded-lg p-6 bg-white">
              <Feed
                songs={filteredSongs}
                playlists={activeTab === 'playlists' ? playlists : []}
                userPlaylists={userPlaylists}
                userId={user.userId}
                onDeleteSong={onDeleteSong}
                activeTab={activeTab}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
