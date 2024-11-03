import React from 'react';
import PlaylistPreview from './PlaylistPreview';
import Song from './Song';

const Feed = ({ songs, playlists, userId, onDeleteSong, activeTab }) => {
  if (!songs.length && !playlists.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 space-y-6">
      {activeTab === 'songs' && (
        <div className="feed-songs">
          <h3 className="text-2xl font-bold mb-4">Songs</h3>
          {songs.length > 0 ? (
            songs.map((song) => (
              <Song
                key={song._id}
                song={song}
                playlists={playlists}
                userId={userId}
                onDelete={onDeleteSong}
                showAddToPlaylistButton={!song.deleted}
              />
            ))
          ) : (
            <p>No songs found</p>
          )}
        </div>
      )}

      {activeTab === 'playlists' && (
        <div className="feed-playlists">
          <h3 className="text-2xl font-bold mb-4">Latest Activity By Your Friends</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <PlaylistPreview key={playlist._id} playlist={playlist} />
              ))
            ) : (
              <p>Nothing to see here.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
