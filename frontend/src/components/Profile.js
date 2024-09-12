//u23530996 Kiara Hodgson

import React from 'react';

const Profile = ({ user }) => {
  if (!user) return <p>User Data Empty</p>;

  return (
    <div className="profile-class">
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
};

export default Profile;
