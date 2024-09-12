//song component

import React from 'react';

const Song = ({ song }) => (
  <div className="song">
    <h4>{song.name}</h4>
    <p>{song.artist}</p>
  </div>
);

export default Song;
