//u23530996 Kiara Hodgson

import React from 'react';

const Comment = ({ comment }) => (
  <div className="comments">
    <p>
      <b>{comment.user}</b>: {comment.text}
    </p>
  </div>
);

export default Comment;
