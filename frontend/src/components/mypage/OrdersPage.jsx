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
        const response = await axios.get('/user');
        setPosts(response.data);
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
          <div id="main-screen">
            <div id="delivery-recruitment-list">
              {posts?.map(({ id, restaurant, menu, recruiter, recruit, recruited, timer, cost, isValid }) => (
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
