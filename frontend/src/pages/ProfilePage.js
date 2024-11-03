import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentList from '../components/CommentList';
import AddComment from '../components/AddComment';
import PlaylistPreview from '../components/PlaylistPreview';
import ProfilePreview from '../components/ProfilePreview';
import defaultProfilePic from '../assets/images/profile_default.webp';

const ProfilePage = ({ userId, loggedInUserId, comments = [] }) => {
  const [profileData, setProfileData] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const navigate = useNavigate();

  const isViewingOwnProfile = profileData?._id === loggedInUserId;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log(`Fetching profile data for userId: ${userId}`);
        const response = await fetch(`http://localhost:8000/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();
        console.log("Fetched profile data:", data);

        setProfileData({
          ...data,
          profileImage: data.profileImage || defaultProfilePic,
          socialLinks: data.socialLinks || [],
          friends: data.friends || []
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchFriendStatus = async () => {
      if (userId !== loggedInUserId) {
        try {
          const response = await fetch(`http://localhost:8000/api/users/${userId}/is-friend/${loggedInUserId}`);
          if (!response.ok) throw new Error('Failed to check friend status');
          const { isFriend } = await response.json();
          setIsFriend(isFriend);
        } catch (error) {
          console.error("Error checking friend status:", error);
        }
      }
    };

    const fetchUserPlaylists = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/playlists/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch playlists');
        const playlists = await response.json();
        setUserPlaylists(playlists);
      } catch (error) {
        console.error("Error fetching user playlists:", error);
      }
    };

    if (userId) {
      fetchProfileData();
      fetchUserPlaylists();
      fetchFriendStatus();
    }
  }, [userId, loggedInUserId]);

  const handleViewPlaylist = (playlistId) => {
    navigate(`/playlists/${playlistId}`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 400;
          const scaleSize = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedImage = canvas.toDataURL("image/jpeg", 0.7);
          setProfileData((prevData) => ({ ...prevData, profileImage: resizedImage }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileData.name,
          username: profileData.username,
          pronouns: profileData.pronouns,
          bio: profileData.bio,
          profileImage: profileData.profileImage
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedProfile = await response.json();
      setProfileData(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAddFriend = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${loggedInUserId}/add-friend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId: userId })
      });

      if (!response.ok) throw new Error('Failed to add friend');

      // fetches the profile data again to update the friends list
      const updatedProfileResponse = await fetch(`http://localhost:8000/api/users/${userId}`);
      const updatedProfileData = await updatedProfileResponse.json();

      setProfileData({
        ...updatedProfileData,
        profileImage: updatedProfileData.profileImage || defaultProfilePic,
        socialLinks: updatedProfileData.socialLinks || [],
        friends: updatedProfileData.friends || []
      });

      setIsFriend(true);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  if (!profileData) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>{isViewingOwnProfile ? 'Your Profile' : `${profileData.name || ''}'s Profile`}</h1>
      </header>

      <div className="profile-info-container">
        <section className="profile-image-section text-center">
          <img src={profileData.profileImage || defaultProfilePic} alt="Profile" />
          {isEditing && isViewingOwnProfile && (
            <input type="file" onChange={handleImageUpload} />
          )}
        </section>

        <section className="profile-info">
          <p><strong>Friends:</strong> {profileData.friends.length} friends</p>
          
          {isFriend || isViewingOwnProfile ? (
            <>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={profileData.name || ''}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={profileData.username || ''}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    placeholder="Username"
                  />
                  <input
                    type="text"
                    value={profileData.pronouns || ''}
                    onChange={(e) => setProfileData({ ...profileData, pronouns: e.target.value })}
                    placeholder="Pronouns"
                  />
                  <textarea
                    value={profileData.bio || ''}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Bio"
                  />
                  <button onClick={handleSaveProfile} className="off-white-button">
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p><strong>Name:</strong> {profileData.name || 'N/A'}</p>
                  <p><strong>Username:</strong> {profileData.username || 'N/A'}</p>
                  <p><strong>Pronouns:</strong> {profileData.pronouns || 'N/A'}</p>
                  <p><strong>Bio:</strong> {profileData.bio || 'N/A'}</p>
                  {isViewingOwnProfile && (
                    <button onClick={() => setIsEditing(true)} className="off-white-button">
                      Edit Profile
                    </button>
                  )}
                </>
              )}
              
              {/* conditionally shows friend's list if is own profile or friend's profile */}
              {profileData.friends.length > 0 && (
                <section className="friends-list">
                  <h3>{profileData.name || 'This user'}'s Friends:</h3>
                  {profileData.friends.map((friend) => (
                    <ProfilePreview key={friend._id} profile={friend} />
                  ))}
                </section>
              )}
            </>
          ) : (
            <button onClick={handleAddFriend} className="off-white-button">
              Add Friend
            </button>
          )}
        </section>
      </div>

      {(isFriend || isViewingOwnProfile) && (
        <>
          <section className="playlist-details">
            {userPlaylists.length > 0 ? (
              userPlaylists.map((playlist) => (
                <PlaylistPreview
                  key={playlist._id}
                  playlist={playlist}
                  onClick={() => handleViewPlaylist(playlist._id)}
                  showCreatorMessage={false}
                />
              ))
            ) : (
              <p>No playlists available.</p>
            )}
          </section>

          <section className="comments-section mb-10 max-w-lg mx-auto p-10 bg-white shadow-md rounded-lg overflow-y-auto h-70">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {comments.length > 0 ? <CommentList comments={comments} /> : <p>No comments available.</p>}
            <AddComment />
          </section>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
