//u23530996 Kiara Hodgson
import React from 'react';

const ProfilePreview = ({ profile }) => {
  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.bio}</p>
    </div>
  );
};

export default ProfilePreview;
