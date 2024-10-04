import React from 'react';

const Profile = ({ user }) => (
  <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-4">
      <img
        src={user.avatar}
        alt="avatar"
        className="w-16 h-16 rounded-full border border-gray-300"
      />
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
        <p className="text-gray-600">{user.bio}</p>
      </div>
    </div>
  </div>
);

export default Profile;
