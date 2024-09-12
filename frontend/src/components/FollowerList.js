//u23530996 Kiara Hodgson
import React from 'react';
import ProfilePreview from './ProfilePreview';

const FollowerList = ({ followers }) => (
  <div>
    <h2>Followers</h2>
    {followers.map(follower => (
      <ProfilePreview key={follower.id} profile={follower} />
    ))}
  </div>
);

export default FollowerList;
