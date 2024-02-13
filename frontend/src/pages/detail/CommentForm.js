import { useState } from 'react';

export const CommentForm = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onCommentSubmit(comment);
    setComment('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-input"
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="댓글을 입력하세요..."
        required
      />
      <button className="comment-submit" type="submit">
        SEND
      </button>
    </form>
  );
};
