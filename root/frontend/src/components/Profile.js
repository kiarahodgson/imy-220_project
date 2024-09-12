import React from 'react';

const Profile = ({ user }) => {
  if (!user) return <p>No user data</p>;

  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
};

export default Profile;
