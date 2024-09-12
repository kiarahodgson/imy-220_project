import React from 'react';

const Followers = ({ followers }) => (
    <div>
      <h3>Followers</h3>
      {followers.map((follower) => (
        <ProfilePreview key={follower.id} {...follower} />
      ))}
    </div>
  );
  
  export default Followers;