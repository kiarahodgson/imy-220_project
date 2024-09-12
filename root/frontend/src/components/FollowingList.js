// FollowingList.js
import React from 'react';
import ProfilePreview from './ProfilePreview';

const FollowingList = ({ following }) => (
  <div>
    <h2>Following</h2>
    {following.map(user => (
      <ProfilePreview key={user.id} profile={user} />
    ))}
  </div>
);

export default FollowingList;
