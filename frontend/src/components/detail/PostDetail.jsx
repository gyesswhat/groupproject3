import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../header/Header';
import { CommentForm } from './CommentForm';
import { PostContents } from './PostContents';
import { StatusList } from './StatusList';
import { dummyDeliveryRecruitment } from '../posts/posts.const';

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [part, setPart] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  const [isJoined, setIsJoined] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

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

  useEffect(() => {
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

    const postDate = new Date(post.createdAt);
    // 현재 시간
    const currentDate = new Date();

    // 현재 시간과 게시글 작성 시간의 차이 계산 (밀리초 단위)
    const timeDiff = postDate - currentDate;

    remainingTime = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    // 상태 업데이트
    setRemainingTime(remainingTime);

    fetchPost();
    fetchComment();
    fetchPart();
  }, [postId]);

  useEffect(() => {
    if (post && remainingTime === 0 && post.recruit !== part.length) {
      <Link to={`/post/${postId}/order-failed`} />;
    }
  }, [post, part, remainingTime]);

  const isCaptain = post.userId === currentUserId;

  return (
    <>
      <Header />
      <div id="wrap">
        <div id="inner-wrap">
          {post && (
            <>
              {post.map(({ location, restaurant, menu, partNum, price, postBody }) => (
                <PostContents
                  key={postId}
                  id={postId}
                  restaurant={restaurant}
                  menu={menu}
                  recruit={partNum}
                  recruited={part.length}
                  timer={
                    <>
                      <p id="green">{remainingTime}</p> <p>분 뒤 주문 예정</p>
                    </>
                  }
                  cost={price}
                  content={postBody}
                  building={location}
                  account={part.account}
                  isJoined={isJoined}
                  click={handleButtonClick}
                  disabled={isButtonDisabled}
                />
              ))}
              <div id="part-wrap">
                {isCaptain ? null : isJoined ? (
                  <button onClick={handleDepositButtonClick} disabled={isButtonDisabled}>
                    입금 완료
                  </button>
                ) : null}
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
                  {comments.map(({ id, nickname, time, content }) => (
                    <div key={id} id="comment">
                      <div id="place-text">
                        <p id="bold-margin">{nickname}</p>
                        <p id="role">{time}분 전</p>
                      </div>
                      <p
                        id="darkgray"
                        style={{
                          color: part[0].nickname === nickname ? 'green' : '#334253',
                          fontWeight: part[0].nickname === nickname ? '800' : '500',
                        }}>
                        {content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}{' '}
          : (<p>Loading...</p>)
        </div>
      </div>
    </>
  );
};
