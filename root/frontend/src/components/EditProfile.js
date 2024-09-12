import React from 'react';

const EditProfile = ({ user }) => (
  <div className="edit-profile">
    <h3>Edit Profile</h3>
    <form>
      <label>Name:
        <input type="text" defaultValue={user.name} />
      </label>
      <label>Bio:
        <textarea defaultValue={user.bio} />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  </div>
);

export default EditProfile;
