import React from 'react';

const Comment = ({ comment }) => (
  <div className="comment">
    <p><strong>{comment.user}</strong>: {comment.text}</p>
  </div>
);

export default Comment;
