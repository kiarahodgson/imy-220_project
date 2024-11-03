import React from 'react';

const EditProfile = ({ user }) => (
  <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
    <form className="space-y-4">
      <label className="block text-gray-700">Name:
        <input
          type="text"
          defaultValue={user.name}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
        />
      </label>
      <label className="block text-gray-700">Bio:
        <textarea
          defaultValue={user.bio}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
        />
      </label>
      <button
        type="submit"
        className="off-white-button"
      >
        Submit Changes
      </button>
    </form>
  </div>
);

export default EditProfile;
