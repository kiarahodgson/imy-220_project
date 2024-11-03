import React from 'react';
import { Link } from 'react-router-dom';
import defaultProfilePic from '../assets/images/profile_default.webp';

const ProfilePreview = ({ profile }) => (
  <Link to={`/profile/${profile._id}`} className="profile-preview">
    <div className="profile-preview-content">
      <img
        src={profile.profileImage || defaultProfilePic}
        alt={`${profile.username}'s avatar`}  // Updated for username
        className="profile-preview-image"
      />
      <div className="profile-preview-info">
        <h4 className="profile-preview-name">{profile.username}</h4>  {/* Updated for username */}
      </div>
    </div>
  </Link>
);

export default ProfilePreview;
