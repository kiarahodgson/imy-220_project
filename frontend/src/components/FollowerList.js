import React from 'react';

const FollowerList = ({ followers }) => (
  <div className="space-y-4">
    {followers.map((follower) => (
      <div key={follower.id} className="p-4 border rounded-md shadow-md">
        <p className="font-semibold text-gray-700">{follower.name}</p>
      </div>
    ))}
  </div>
);

export default FollowerList;
