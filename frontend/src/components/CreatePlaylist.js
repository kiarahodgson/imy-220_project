import React, { useState } from 'react';

const CreatePlaylist = ({ onCreate, totalPlaylists }) => {
  const [title, setTitle] = useState(`NewPlaylist #${totalPlaylists + 1}`);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState('');

  const predefinedGenres = ['Pop', 'Metal', 'Rock', 'Hip-hop', 'Jazz', 'Mix'];

  const handleAddHashtag = () => {
    if (hashtagInput) {
      setHashtags((prevHashtags) => [...prevHashtags, `#${hashtagInput.trim()}`]);
      setHashtagInput('');
    }
  };

  // file upload to database 
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlaylist = {
      title,
      description,
      category,
      hashtags,
      coverImage,
    };

    onCreate(newPlaylist);

    setTitle(`NewPlaylist #${totalPlaylists + 2}`);
    setDescription('');
    setCategory('');
    setCoverImage(null);
    setHashtags([]);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a New Playlist</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">Playlist Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700">Genre:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select Category</option>
            {predefinedGenres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700">Playlist Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="coverImage" className="block text-gray-700">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="hashtags" className="block text-gray-700">Hashtags:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              placeholder="Add hashtag"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <button type="button" onClick={handleAddHashtag} className="off-white-button">
              Add
            </button>
          </div>
          <div className="mt-2">
            {hashtags.map((tag, index) => (
              <span key={index} className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 mr-2 mt-2">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="off-white-button"
        >
          Create Playlist
        </button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
