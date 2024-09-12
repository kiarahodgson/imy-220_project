//u23530996 Kiara Hodgson

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <Link to="/">Login</Link>
    <Link to="/home">Home</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/playlists">Playlists</Link>
  </nav>
);

export default Header;