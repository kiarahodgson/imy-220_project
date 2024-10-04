import React from 'react';
import { useParams } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { getProfileById, dummyPlaylists } from './dumdat';

const ProfilePageParams = () => {
  const { id } = useParams();
  const profile = getProfileById(id);

  if (!profile) {
    return <p className="text-red-500">Profile not found</p>;
  }

  return (
    <ProfilePage
      user={profile}
      playlists={dummyPlaylists}
      followers={profile.followers}
      following={profile.following}
    />
  );
};

export default ProfilePageParams;
