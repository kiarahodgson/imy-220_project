import React from 'react';
import { useParams } from 'react-router-dom';
import PlaylistPage from './PlaylistPage';
import { getPlaylistById, dummyComments } from './dumdat';

const PlaylistPageParams = () => {
  const { id } = useParams();
  const playlist = getPlaylistById(id);

  console.log('Requested playlist ID:', id);
  console.log('Fetched playlist:', playlist);

  if (!playlist) {
    return <p className="text-red-500">Playlist not found.</p>;
  }

  return (
    <PlaylistPage
      playlists={[playlist]}
      comments={dummyComments}
    />
  );
};

export default PlaylistPageParams;
