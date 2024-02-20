import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../header/Header';
import { CommentForm } from './CommentForm';
import { PostContents } from './PostContents';
import { StatusList } from './StatusList';

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [part, setPart] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  const [isJoined, setIsJoined] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const currentUserId = sessionStorage.getItem('userId');

  const sendJoinRequest = async () => {
    try {
      const response = await axios.post(`/posts/${postId}/join`, currentUserId);
      console.log('Join request successful:', response.data);
    } catch (error) {
      console.error('Join request failed:', error);
    }
  };

  const handleButtonClick = () => {
    setButtonDisabled(true);
    setIsJoined(true);
    sendJoinRequest(currentUserId);
  };

  const handleDepositButtonClick = () => {
    sendDepositRequest(currentUserId);
    setButtonDisabled(true);
  };

  const sendDepositRequest = async () => {
    try {
      const response = await axios.post(`/posts/${postId}/deposit`, currentUserId);
      console.log('Deposit request successful:', response.data);
    } catch (error) {
      console.error('Deposit request failed:', error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchComment = async () => {
    try {
      const response = await axios.get(`/posts/${postId}/comment`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comment:', error);
    }
  };

  const fetchPart = async () => {
    try {
      const response = await axios.get(`/posts/${postId}/participants`);
      setPart(response.data);
    } catch (error) {
      console.error('Error fetching participant:', error);
    }
  };

  const calculateRemainingTime = createdAt => {
    const timeDiff = new Date() - new Date(createdAt);
    const remainingTime = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return remainingTime;
  };

  useEffect(() => {
    if (post) {
      const remainingTime = calculateRemainingTime(post.createdAt);
      setRemainingTime(remainingTime);
    }
  }, [post]);

  useEffect(() => {
    fetchPost();
    fetchComment();
    fetchPart();
  }, [postId]);

  useEffect(() => {
    if (post && remainingTime < 0 && post.recruit !== part.length) {
      <Link to={`/post/${postId}/order-failed`} />;
    }
  }, [post, part, remainingTime]);

  const handleEditSubmit = async (commentId, editedComment) => {
    try {
      const response = await axios.patch(`/posts/${postId}/comment/${commentId}`, {
        content: editedComment,
      });
      console.log('Comment updated successfully:', response.data);

      setEditIndex(null);
      setEditedComment('');

      fetchComment();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleSaveEdit = commentId => {
    handleEditSubmit(commentId, editedComment);
  };

  const handleEditClick = (commentId, content) => {
    setEditIndex(commentId);
    setEditedComment(content);
  };

  const handleDeleteComment = async commentId => {
    try {
      const response = await axios.delete(`/posts/${postId}/comment/${commentId}`);
      console.log('Comment deleted successfully:', response.data);

      fetchComment();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const isCaptain = post?.userId === currentUserId;

  if (!post) {
    return (
      <>
        <Header />
        <div id="wrap">
          <div id="inner-wrap">
            <p>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div id="wrap">
        <div id="inner-wrap">
          <PostContents
            key={postId}
            id={postId}
            restaurant={post.restaurant}
            menu={post.menu}
            recruit={post.partNum}
            recruited={part.length}
            timer={remainingTime}
            cost={post.price}
            content={post.postBody}
            building={post.location}
            account={part.account}
            isJoined={isJoined}
            click={handleButtonClick}
            disabled={isButtonDisabled}
          />
          <div id="part-wrap">
            {isCaptain ? null : isJoined ? (
              <button onClick={handleDepositButtonClick} disabled={isButtonDisabled}>
                입금 완료
              </button>
            ) : null}
            <h4>참여자 목록</h4>
            {part.map(({ nickname, status }, index) => (
              <div id="participants" key={nickname}>
                <div id="participant-list">
                  <div id="participant">
                    <p id="role">{index === 0 ? '방장' : '참여자'}</p>
                    <p id="nickname">{nickname}</p>
                  </div>
                </div>
                <div id="status">{index === 0 ? null : <StatusList status={status} />}</div>
              </div>
            ))}
          </div>
          <div id="com-wrap">
            <h4>댓글</h4>
            <div id="comments">
              <CommentForm postId={postId} />
              {comments.map(({ CommentId, nickname, createdAt, content, index }) => (
                <div key={CommentId} id="comment">
                  <div id="place-text">
                    <p id="bold-margin">{nickname}</p>
                    <p id="role">{calculateRemainingTime(createdAt)}분 전</p>
                    <button id="edit" onClick={() => handleEditClick(CommentId, content)}>
                      수정
                    </button>
                    <button id="edit" onClick={() => handleDeleteComment(CommentId)}>
                      삭제
                    </button>
                  </div>
                  {editIndex !== null && editIndex === index ? (
                    // 수정 가능한 입력란 렌더링
                    <textarea
                      value={editedComment} // 수정된 내용 표시
                      onChange={e => setEditedComment(e.target.value)} // 수정된 내용 업데이트
                      placeholder="댓글을 수정하세요..."
                    />
                  ) : (
                    // 기존 댓글 내용 표시
                    <p
                      id="darkgray"
                      style={{
                        color: part[0].nickname === nickname ? 'green' : '#334253',
                        fontWeight: part[0].nickname === nickname ? '800' : '500',
                      }}>
                      {content}
                    </p>
                  )}

                  {editIndex === index && (
                    // 수정된 내용 저장 버튼
                    <button onClick={() => handleSaveEdit(CommentId)}>저장</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
