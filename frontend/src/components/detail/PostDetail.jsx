import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
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
  const [isDepositButtonDisabled, setDepositButtonDisabled] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const currentUserId = sessionStorage.getItem('userId');

  const sendJoinRequest = async () => {
    try {
      const response = await axios.post(`/posts/${postId}/join`, currentUserId);

      localStorage.setItem('Joined', true);
      fetchPart();
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
    setDepositButtonDisabled(true);
    localStorage.setItem('DepositButton', true);
  };

  const sendDepositRequest = async () => {
    try {
      const response = await axios.post(`/posts/${postId}/deposit`, currentUserId);

      fetchPart();
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
      const response = await axios.get(`/posts/${postId}/comments`);
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
    const createdTime = new Date(createdAt);
    const currentTime = new Date();

    const timeDiff = currentTime - createdTime;

    const minutesElapsed = Math.floor(timeDiff / (1000 * 60));

    return minutesElapsed;
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
    if (post && remainingTime < 0 && post.partNum !== part.length) {
      <Link to={`/post/${postId}/order-failed`} />;
    }
  }, [post, part, remainingTime]);

  const handleEditSubmit = async (editIndex, editedComment) => {
    try {
      const response = await axios.patch(`/posts/${postId}/comments/${editIndex}`, {
        commentBody: editedComment,
      });

      setEditIndex(null);
      setEditedComment('');

      fetchComment();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleSaveEdit = (editIndex, editedComment) => {
    handleEditSubmit(editIndex, editedComment);
  };

  const handleEditClick = (commentId, commentBody) => {
    setEditIndex(commentId);
    setEditedComment(commentBody);
  };

  const handleDeleteComment = async commentId => {
    try {
      const response = await axios.delete(`/posts/${postId}/comments/${commentId}`);

      fetchComment();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  function calculatePostRemainingTime(createdAt) {
    const now = new Date(); // 현재 시간

    const createdDate = new Date(createdAt);

    // 현재 시간에 30분을 더함
    const deadline = new Date(createdDate.getTime() + 30 * 60000); // 30분 = 30 * 60 * 1000 밀리초

    const remainingTime = deadline - now;

    const remainingMinutes = Math.ceil(remainingTime / 60000);

    return remainingMinutes;
  }

  const isCaptain = post?.userId === parseInt(currentUserId);

  return (
    <>
      <Header />
      <div id="wrap">
        <div id="inner-wrap">
          {post ? (
            <>
              <PostContents
                key={postId}
                id={postId}
                restaurant={post.restaurant}
                menu={post.menu}
                recruit={post.partNum}
                recruited={part?.length}
                timer={calculatePostRemainingTime(post.createdAt)}
                cost={post.price}
                content={post.postBody}
                building={post.location}
                bank={part?.length > 0 ? part[0].bank : ''}
                account={part?.length > 0 ? part[0].account : ''}
                isJoined={isJoined}
                click={handleButtonClick}
                disabled={isButtonDisabled}
                isCaptain={isCaptain}
              />
              <div id="part-wrap">
                <div id="flex-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4>참여자 목록</h4>
                  {isCaptain ? null : isJoined ? (
                    <button
                      onClick={handleDepositButtonClick}
                      disabled={localStorage.getItem('DepositButton') === 'true'}>
                      입금 완료
                    </button>
                  ) : null}
                </div>
                {part?.map(({ nickname, status }, index) => (
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
                  {postId !== null && comments !== null ? (
                    <CommentForm postId={postId} fetchComment={fetchComment} />
                  ) : (
                    <div>Loading...</div>
                  )}
                  {comments?.map(({ commentId, nickname, createdAt, commentBody, index }) => (
                    <div key={commentId} id="comment">
                      <div id="place-text">
                        <p id="bold-margin">{nickname}</p>
                        <p id="time">{calculateRemainingTime(createdAt)}분 전</p>
                        <button id="edit" onClick={() => handleEditClick(commentId, commentBody)}>
                          수정
                        </button>
                        <button id="edit" onClick={() => handleDeleteComment(commentId)}>
                          삭제
                        </button>
                      </div>
                      {editIndex !== null && editIndex === commentId ? (
                        // 수정 가능한 입력란 렌더링
                        <div className="comment-form">
                          <textarea
                            className="comment-input"
                            value={editedComment} // 수정된 내용 표시
                            onChange={e => setEditedComment(e.target.value)} // 수정된 내용 업데이트
                            placeholder="댓글을 수정하세요..."
                          />
                          <button className="comment-submit" onClick={() => handleSaveEdit(editIndex, editedComment)}>
                            저장
                          </button>
                        </div>
                      ) : part && part[0] !== null ? (
                        // 기존 댓글 내용 표시
                        <p
                          id="darkgray"
                          style={{
                            color: part[0]?.nickname === nickname ? 'green' : '#334253',
                            fontWeight: part[0]?.nickname === nickname ? '800' : '500',
                          }}>
                          {commentBody}
                        </p>
                      ) : (
                        <div>loading...</div>
                      )}

                      {editIndex === index && (
                        // 수정된 내용 저장 버튼
                        <button onClick={() => handleSaveEdit(commentId)}>저장</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};
