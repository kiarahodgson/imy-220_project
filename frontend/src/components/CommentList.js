import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div className="space-y-4">
    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </div>
);

export default CommentList;
