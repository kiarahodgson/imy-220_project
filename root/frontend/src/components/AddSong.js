import React from 'react';

const AddSong = () => (
    <form>
      <input type="text" placeholder="Song Title" />
      <input type="text" placeholder="Artist" />
      <input type="text" placeholder="Duration" />
      <button type="submit">Add Song</button>
    </form>
  );
  
  export default AddSong;