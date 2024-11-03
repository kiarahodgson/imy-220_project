import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo_sonica.png';
import profilePic from '../assets/images/profile_default.webp';

const Header = ({ user, onLogout }) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-[#E3EEFF] to-[#A6BDFF] text-black shadow-md pr-8">
      <div className="flex items-center">
       
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto mr-4 pl-8" />
        </Link>
      </div>
      <div className="flex items-center ml-auto">
        {!user ? (
          <Link to="/" className="mr-4 hover:text-[#6E70C1]">Login</Link>
        ) : (
          <>
            <Link to="/home" className="mr-4 pr-3 hover:text-[#6E70C1]">Home</Link>
            <Link to="/profile" className="mr-4 pr-10 hover:text-[#6E70C1]">My Profile</Link>
            <span className="mx-4">{user.username}</span>
            <Link to="/profile">
              <img
                src={user.profileImage || profilePic}
                alt="Profile"
                className="h-10 w-10 rounded-full hover:opacity-80 cursor-pointer"
              />
            </Link>
            <button onClick={onLogout} className="ml-4 text-[#6377A8] hover:text-red-500">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
