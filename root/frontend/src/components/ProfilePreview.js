import React from 'react';

const ProfilePreview = ({ profile }) => {
  return (
    <div>
      <h3>{profile.name}</h3>
      <p>{profile.bio}</p>
    </div>
  );
};

export default ProfilePreview;
