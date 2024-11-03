import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, user, onLikeToggle }) => (
  <div className="space-y-4">
    {comments.map((comment) => (
      <Comment key={comment._id} comment={comment} user={user} onLikeToggle={onLikeToggle} />
    ))}
  </div>
);

export default CommentList;
