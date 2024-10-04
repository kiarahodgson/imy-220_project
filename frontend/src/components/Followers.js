import React from 'react';
import ProfilePreview from './ProfilePreview';

const Followers = ({ followers }) => (
  <div>
    <h3 className="text-2xl font-bold">Followers</h3>
    {followers.map((follower) => (
      <ProfilePreview key={follower.id} {...follower} />
    ))}
  </div>
);

export default Followers;
