import React from 'react';

const ProfilePreview = ({ profile }) => (
  <div className="p-4 border rounded-md shadow-md flex items-center space-x-4">
    <img
      src={profile.avatar}
      alt={profile.name}
      className="w-12 h-12 rounded-full border border-gray-300"
    />
    <div>
      <h4 className="text-lg font-semibold">{profile.name}</h4>
      <p className="text-gray-600">{profile.bio}</p>
    </div>
  </div>
);

export default ProfilePreview;
