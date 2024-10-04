import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo_sonica.png';
import profilePic from '../assets/images/profile_default.webp';

const Header = ({ user }) => (
  <nav className="flex items-center justify-between p-4 bg-[#AE869A] text-white">
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="h-10 w-auto mr-4" />
    </div>
    <div className="flex items-center ml-auto">
      <Link to="/" className="mr-4 hover:text-[#6E70C1]">Login</Link>
      <Link to="/home" className="mr-4 hover:text-[#6E70C1]">Home</Link>
      <Link to="/profile" className="mr-4 hover:text-[#6E70C1]">Profile</Link>
      <Link to="/playlists" className="hover:text-[#6E70C1]">Playlists</Link>
      {user && (
        <>
          <span className="mx-4">Hi, {user.username}</span>
          <Link to="/profile">
            <img
              src={profilePic}
              alt="Profile"
              className="h-10 w-10 rounded-full hover:opacity-80 cursor-pointer"
            />
          </Link>
        </>
      )}
    </div>
  </nav>
);

export default Header;
