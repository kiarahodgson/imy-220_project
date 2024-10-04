import React from 'react';

const Comment = ({ comment }) => (
  <div className="border border-gray-200 p-4 rounded-md shadow-sm">
    <p>
      <b className="text-gray-700">{comment.user}</b>: {comment.text}
    </p>
  </div>
);

export default Comment;
