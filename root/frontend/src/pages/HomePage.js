import React from 'react';
import Feed from '../components/Feed';
import SearchInput from '../components/SearchInput';

const HomePage = ({ songs, playlists }) => (
  <div className="home-page">
    <header className="home-header">
      <h1>Explore Playlists and Songs</h1>
    </header>
    <main className="home-main">
      <section className="search-section">
        <SearchInput />
      </section>
      <section className="feed-section">
        <h2>Latest Songs and Playlists</h2>
        <Feed songs={songs} playlists={playlists} />
      </section>
    </main>
  </div>
);

export default HomePage;
