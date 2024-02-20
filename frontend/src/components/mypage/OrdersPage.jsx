import { useEffect, useState } from 'react';
import axios from 'axios';
import { MyPage } from './MyPage';
import { dummyDeliveryRecruitment } from '../posts/posts.const';
import { DeliveryItem } from '../posts/DeliveryItem';
import { Header } from '../header';

export const OrdersPage = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get('/user');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, []);

  return (
    <div>
      <Header />
      <div id="flex-row">
        <MyPage />
        <div id="inner-wrap">
          <h3>주문 히스토리</h3>
          <div id="main-screen">
            <div id="delivery-recruitment-list">
              {posts.map(({ id, restaurant, menu, recruiter, recruit, recruited, timer, cost, isValid }) => (
                <DeliveryItem
                  key={id}
                  id={id}
                  restaurant={restaurant}
                  menu={menu}
                  recruiter={recruiter}
                  recruit={recruit}
                  recruited={recruited}
                  timer={isValid === 3 ? timer : null}
                  cost={cost}
                  isValid={isValid}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
