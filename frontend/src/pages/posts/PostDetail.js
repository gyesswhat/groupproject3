import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dummyDeliveryRecruitments } from '../main/posts.const';
import Topbar from '../main/Topbar';
import StatusList from './Status';
import CommentForm from './Comment';
import { PARTICIPANTS } from './part.const';

const PostContents = ({ restaurant, menu, timer, recruit, recruited, cost, building, account, content }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleButtonClick = () => {
    setButtonDisabled(true); // 버튼 비활성화
    setIsJoined(true);
  };

  return (
    <div id="postcontent">
      <div id="main-content">
        <div id="recruiter-cost">
          <h4>
            [{restaurant}] {menu}
          </h4>
          <div id="cost-recruit">
            <div id="cost">
              <p id="green">배달비 포함</p> <h4>{cost}</h4> <p>원</p>
            </div>

            <button type="submit" onClick={handleButtonClick} disabled={isButtonDisabled}>
              참여하기
            </button>
          </div>
        </div>
        <div id="info">
          <p id="green">{timer}분</p>
          <p> 뒤 주문 예정</p>
          <p className="dot" id="green">
            •
          </p>
          <p>모집 인원</p>
          <p id="green">
            {recruited}/{recruit}
          </p>
        </div>
        <div id="where">
          <p>배달받을 장소:</p> <p id="green">{building}</p>
        </div>
        {isJoined && (
          <div id="where">
            <p>계좌 정보:</p> <p id="green">{account}</p>
          </div>
        )}
        <p>{content}</p>
      </div>
    </div>
  );
};

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // postId를 사용하여 API를 호출
    // fetch(`https://api.example.com/post/${postId}`)
    //   .then(response => response.json())
    //   .then(data => setPost(data))
    //   .catch(error => console.error('Error fetching post:', error));
    // comments 정보
    // fetch(`https://api.example.com/post/${postId}/comments`)
    //   .then(response => response.json())
    //   .then(data => setComments(data))
    //   .catch(error => console.error('Error fetching comments:', error));

    const dummyComments = [
      { id: 1, nickname: '폼폼푸린', time: 4, content: '계란초밥 3개 추가 가능합니까?' },
      { id: 2, nickname: '마이멜로디', time: 3, content: '요청사항 댓글 작성해주세요' },
    ];

    const selectedPost = dummyDeliveryRecruitments.filter(post => post.id === Number(postId));

    if (selectedPost.length > 0) {
      setPost(selectedPost);
      setComments(dummyComments);
    }
  }, [postId]);

  return (
    <>
      <Topbar />
      <div id="wrap">
        <div id="inner-wrap">
          {post ? (
            <>
              {post.map(({ id, restaurant, menu, recruit, recruited, timer, cost, content, building, account }) => (
                <PostContents
                  key={id}
                  id={id}
                  restaurant={restaurant}
                  menu={menu}
                  recruit={recruit}
                  recruited={recruited}
                  timer={timer}
                  cost={cost}
                  content={content}
                  building={building}
                  account={account}
                />
              ))}
              <div id="part-wrap">
                <h4>참여자 목록</h4>
                {PARTICIPANTS.map((participant, index) => (
                  <div id="participants">
                    <div id="participant-list">
                      <div key={index} id="participant">
                        <p id="role">{index === 0 ? '방장' : '참여자'}</p>
                        <p>{participant.nickname}</p>
                      </div>
                    </div>

                    <div id="status">{index === 0 ? null : <StatusList status={participant.status} />}</div>
                  </div>
                ))}
              </div>

              <h4>댓글</h4>
              <div id="comments">
                <CommentForm />
                {comments.map(comment => (
                  <div key={comment.id}>
                    <div id="place-text">
                      <p id="bold-margin">{comment.nickname}</p>
                      <p>{comment.time}분 전</p>
                    </div>
                    <p id="darkgray">{comment.content}</p>
                  </div>
                ))}
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

export default PostDetail;
