const ProfilePageParams = ({ loggedInUserId }) => {
  const { id } = useParams();
  const isViewingOwnProfile = loggedInUserId === id;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch user profile');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (!profileData) return <p>Profile not found</p>;

  return (
    <ProfilePage
      userId={id}               
      loggedInUserId={loggedInUserId} 
      user={profileData}       
      isViewingOwnProfile={isViewingOwnProfile}
    />
  );
};
