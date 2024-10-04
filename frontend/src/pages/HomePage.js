import React, { useEffect, useState } from 'react';
import Feed from '../components/Feed';
import SearchInput from '../components/SearchInput';

const HomePage = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/songs');
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        const data = await response.json();
        setSongs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/playlists');
        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }
        const data = await response.json();
        setPlaylists(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    Promise.all([fetchSongs(), fetchPlaylists()]).catch(err => setError(err.message));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page">
      <header className="home-head">
        <h1>Find new Playlists and Songs you like</h1>
      </header>
      <main className="home-main">
        <section className="search-section">
          <SearchInput />
        </section>
        <section className="feed-section">
          <h2>Recently Released Tracks</h2>
          <Feed songs={songs} playlists={playlists} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
