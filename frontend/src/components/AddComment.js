import React, { useState } from 'react';

const AddComment = ({ playlistId, user, addComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await fetch(`http://localhost:8000/api/comments/${playlistId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, userId: user._id, username: user.username }),
      });

      if (!response.ok) throw new Error('Failed to post comment');
      
      const newComment = await response.json();
      addComment(newComment);
      setText('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
        placeholder="Tell us what you think"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="off-white-button"
      >
        Post Comment
      </button>
    </form>
  );
};

export default AddComment;
