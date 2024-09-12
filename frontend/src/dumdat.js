export const dummySongs = [
  { id: 1, name: 'Song One', artist: 'Taylor Swift' },
  { id: 2, name: 'Song Two', artist: 'Sabrina Carpenter' },
];

export const dummyPlaylists = [
  { id: 1, name: 'Chill Vibes', description: 'Perfect for studying' },
  { id: 2, name: 'Hype', description: 'Going clubbing tonight' },
];

export const dummyComments = [
  { id: 1, author: 'UserOne', content: 'This song is so good', timestamp: '2024-03-27' },
  { id: 2, author: 'UserTwo', content: '<3 this song makes me so happy', timestamp: '2024-05-10' },
];

export const dummyProfiles = [
  {
    id: 1,
    name: 'Kiara Hodgson',
    bio: 'Luv groovy tunes',
    playlists: dummyPlaylists,
    followers: [
      { id: 1, name: 'Shan' },
      { id: 2, name: 'Billy' }
    ],
    following: [
      { id: 1, name: 'Tom' },
      { id: 2, name: 'Holland' }
    ]
  }
];

export const getProfileById = (id) => dummyProfiles.find(profile => profile.id === parseInt(id)) || null;
export const getPlaylistById = (id) => dummyPlaylists.find(playlist => playlist.id === parseInt(id)) || null;
