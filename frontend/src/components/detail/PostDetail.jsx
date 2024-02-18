import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../header/Header';
import { dummyDeliveryRecruitment } from '../posts';
import { CommentForm } from './CommentForm';
import { PostContents } from './PostContents';
import { StatusList } from './StatusList';
import { PARTICIPANTS } from './detail.const';

export const PostDetail = () => {
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
      {
        id: 1,
        nickname: '폼폼푸린',
        time: 4,
        content: '계란초밥 3개 추가 가능합니까?',
      },
      {
        id: 2,
        nickname: '마이멜로디',
        time: 3,
        content: '요청사항 댓글 작성해주세요',
      },
    ];

    const selectedPost = dummyDeliveryRecruitment.filter(post => post.id === Number(postId));

    if (selectedPost.length > 0) {
      setPost(selectedPost);
      setComments(dummyComments);
    }
  }, [postId]);

  return (
    <>
      <Header />
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
                {PARTICIPANTS.map(({ nickname, status }, index) => (
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
                  <CommentForm />
                  {comments.map(({ id, nickname, time, content }) => (
                    <div key={id} id="comment">
                      <div id="place-text">
                        <p id="bold-margin">{nickname}</p>
                        <p id="role">{time}분 전</p>
                      </div>
                      <p
                        id="darkgray"
                        style={{
                          color: PARTICIPANTS[0].nickname === nickname ? 'green' : '#334253',
                          fontWeight: PARTICIPANTS[0].nickname === nickname ? '800' : '500',
                        }}>
                        {content}
                      </p>
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
