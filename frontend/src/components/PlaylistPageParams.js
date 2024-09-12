//u23530996 Kiara Hodgson

import React from 'react';
import { useParams } from 'react-router-dom';
import PlaylistPage from './PlaylistPage';
import { getPlaylistById, dummyComments } from './dumdat';

const PlaylistPageParams = () => {
  const { id } = useParams();
  const playlist = getPlaylistById(id);
  

  if (!playlist) {
    return <p>Playlist not found.</p>; 
  }

  return (
    <PlaylistPage
      playlists={[playlist]}
      comments={dummyComments}
    />
  );
};

export default PlaylistPageParams;
