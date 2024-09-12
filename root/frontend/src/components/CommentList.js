import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </div>
);

export default CommentList;
