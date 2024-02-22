import { useState } from 'react';
import axios from 'axios';

export const CommentForm = ({ onCommentSubmit, postId }) => {
  const [comment, setComment] = useState('');
  const currentUserId = parseInt(sessionStorage.getItem('userId'));

  const [formData, setFormData] = useState({
    commentBody: '',
    userId: currentUserId,
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`/posts/${postId}/comment`, formData);
      if (response.status === 200) {
        console.log('Comment sent');
      } else {
        console.error('Comment sending failed');
      }
    } catch (error) {
      console.error('Comment Error', error);
      console.log(typeof comment);
      console.log(typeof currentUserId);
    }
    setComment('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-input"
        name="commentBody"
        value={formData.commentBody}
        onChange={handleChange}
        required
      />
      <button className="comment-submit" type="submit">
        SEND
      </button>
    </form>
  );
};
