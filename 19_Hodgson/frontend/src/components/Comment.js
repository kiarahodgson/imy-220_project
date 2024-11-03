import React, { useState } from 'react';

const Comment = ({ comment, user, onLikeToggle }) => {
  const [liked, setLiked] = useState(comment.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(comment.likes.length);

  const handleLikeToggle = async () => {
    try {
      await onLikeToggle(comment._id, liked);
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <div className="border border-gray-200 p-4 rounded-md shadow-sm">
      <p>
        <b className="text-gray-700">{comment.username}</b>: {comment.text}
      </p>
      <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
      <div className="flex items-center space-x-2 mt-2">
        <button onClick={handleLikeToggle} className="text-blue-500">
          {liked ? 'Unlike' : 'Like'}
        </button>
        <span className="text-gray-600">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
      </div>
    </div>
  );
};

export default Comment;
