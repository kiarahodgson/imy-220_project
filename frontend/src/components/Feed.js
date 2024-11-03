import React from 'react';
import PlaylistPreview from './PlaylistPreview';
import Song from './Song';

const Feed = ({ songs, playlists, userId, onDeleteSong, activeTab, userPlaylists, loading }) => {
  const renderSkeleton = (type) => (
    <div className="p-4 space-y-6 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-gray-200 rounded-lg shadow-lg-purple p-4">
          <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          {type === 'song' && <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>}
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      {activeTab === 'songs' && (
        <div className="feed-songs">
          <h3 className="text-2xl font-bold mb-4">Songs</h3>
          {loading ? (
            renderSkeleton('song') // Show song skeletons if loading
          ) : songs.length > 0 ? (
            songs.map((song) => (
              <Song
                key={song._id}
                song={song}
                playlists={userPlaylists}
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
            {loading ? (
              renderSkeleton('playlist') // Show playlist skeletons if loading
            ) : playlists.length > 0 ? (
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
