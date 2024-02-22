import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../header';
import { DeliveryItem } from '../posts/DeliveryItem';
import { MyPage } from './MyPage';

export const OrdersPage = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get('/user/posts');
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, []);

  return (
    <div id="justify-center">
      <Header />
      <div id="flex-row" style={{ justifyContent: 'center' }}>
        <MyPage />
        <div id="inner-wrap">
          <h3>주문 히스토리</h3>
          {posts?.data === undefined ? (
            <div>loading...</div>
          ) : posts?.length !== 0 ? (
            <div id="main-screen">
              <div id="delivery-recruitment-list">
                {posts?.map(({ postId, restaurant, menu, nickname, partNum, timer, price, isValid }) => (
                  <DeliveryItem
                    key={postId}
                    id={postId}
                    restaurant={restaurant}
                    menu={menu}
                    recruiter={nickname}
                    recruited={<p>없어</p>}
                    recruit={partNum}
                    timer={isValid === 3 ? timer : null}
                    cost={price}
                    isValid={isValid}
                  />
                ))}
              </div>
            </div>
          ) : (
            <h1 id="inner-wrap" style={{ color: 'darkgreen' }}>
              아직 게시글이 없습니다.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
