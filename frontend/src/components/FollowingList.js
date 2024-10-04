import React from 'react';

const FollowingList = ({ following }) => (
  <div className="space-y-4">
    {following.map((person) => (
      <div key={person.id} className="p-4 border rounded-md shadow-md">
        <p className="font-semibold text-gray-700">{person.name}</p>
      </div>
    ))}
  </div>
);

export default FollowingList;
