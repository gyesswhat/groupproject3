import { useState } from 'react';
import axios from 'axios';

export const CommentForm = ({ onCommentSubmit, postId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`/posts/${postId}/comment`, { comment });
      if (response.status === 200) {
        console.log('Comment sent');
        onCommentSubmit();
      } else {
        console.error('Comment sending failed');
      }
    } catch (error) {
      console.error('Comment Error', error);
    }
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
