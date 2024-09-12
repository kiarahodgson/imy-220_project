//u23530996 Kiara Hodgson

import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div className="comments-list">
    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </div>
);

export default CommentList;
