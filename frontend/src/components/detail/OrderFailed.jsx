import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Header } from '../header/Header';
import { PostContents } from './PostContents';
import { StatusList } from './StatusList';

export const OrderFailed = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [part, setPart] = useState(null);

  const [isJoined, setIsJoined] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleButtonClick = () => {
    setButtonDisabled(true);
    setIsJoined(true);
  };

  const currentUserId = sessionStorage.getItem('userId');
  const isCaptain = post.userId === currentUserId;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
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

    fetchPost();
    fetchPart();
  }, [postId]);

  return (
    <>
      <Header />
      <div id="wrap">
        <div id="inner-wrap">
          {post && (
            <>
              {post.map(({ location, restaurant, menu, partNum, price }) => (
                <PostContents
                  key={postId}
                  id={postId}
                  restaurant={restaurant}
                  menu={menu}
                  recruit={partNum}
                  recruited={part.length}
                  timer={<p>주문 취소</p>}
                  cost={price}
                  content={<h4>모집 인원이 다 차지 않아 주문이 취소되었습니다.</h4>}
                  building={location}
                  account={part.account}
                  isJoined={isJoined}
                  click={handleButtonClick}
                  disabled={isButtonDisabled}
                />
              ))}
              <div id="part-wrap">
                {part.map(({ nickname, status, bank, account }, index) => (
                  <div id="participants" key={nickname}>
                    <div id="participant-list">
                      <div id="participant">
                        <p id="role">{index === 0 ? '방장' : '참여자'}</p>
                        <p id="nickname">{nickname}</p>
                      </div>
                    </div>
                    <div id="status">{index === 0 ? null : <StatusList status={status} />}</div>
                    <div id="account">
                      {isCaptain ? (
                        index !== 0 && (
                          <>
                            <p>
                              {bank} / {account}
                            </p>
                          </>
                        )
                      ) : (
                        <p>환불 진행중</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}{' '}
          : (<p>Loading...</p>)
        </div>
      </div>
    </>
  );
};
