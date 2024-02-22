import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, PlaceDropdown } from '../menu';
import { DeliveryItem } from './DeliveryItem';
import { dummyDeliveryRecruitment } from './posts.const';

export const Posts = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFoodType, setSelectedFoodType] = useState('');

  const [posts, setPosts] = useState([]);
  const [part, setPart] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('/posts');
        console.log(123, response);
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    const fetchPart = async () => {
      try {
        const response = await axios.get(`/posts/${posts.postId}/participants`);
        setPart(response.data);
      } catch (error) {
        console.error('Error fetching participant:', error);
      }
    };

    fetchPosts();
    fetchPart();
  }, [posts?.postId]);

  console.log('posts:', posts);

  const handleBuildingChange = selectedValue => {
    setSelectedBuilding(selectedValue);
  };

  const handleFoodTypeChange = selectedValue => {
    setSelectedFoodType(selectedValue);
  };

  function calculatePostRemainingTime(createdAt) {
    const now = new Date(); // 현재 시간

    const createdDate = new Date(createdAt);

    const deadline = new Date(createdDate.getTime() + 30 * 60000); // 30분 = 30 * 60 * 1000 밀리초

    const remainingTime = deadline - now;

    const remainingMinutes = Math.ceil(remainingTime / 60000);

    return remainingMinutes;
  }

  function filterData() {
    if (posts.data !== undefined) {
      if (posts?.data.length !== 0) {
        const filteredData = posts?.data.filter(
          DeliveryR =>
            (!selectedBuilding || DeliveryR?.location === selectedBuilding) &&
            (!selectedFoodType || DeliveryR?.category === selectedFoodType) &&
            calculatePostRemainingTime(DeliveryR?.createdAt) >= 0,
        );
        console.log(111, filteredData);
        return filteredData;
      }
    } else {
      return;
    }
  }

  return (
    <>
      <Menu onFoodTypeChange={handleFoodTypeChange} />
      <div id="align-center">
        <div id="place">
          <div id="place-text">
            <h2>현재, </h2>
            <PlaceDropdown onBuildingChange={handleBuildingChange} />
            <h2> 내에서 모집 중인 주문은...</h2>
          </div>
          <Link to="/recruit">
            <div id="recruit-button">배달팟 모집</div>
          </Link>
        </div>

        {posts.data === undefined ? (
          <div>loading...</div>
        ) : filterData().length !== 0 ? (
          <div id="main-screen">
            <div id="delivery-recruitment-list">
              {filterData()?.map(({ postId, restaurant, menu, nickname, partNum, nowNum, createdAt, price }) => (
                <DeliveryItem
                  key={postId}
                  id={postId}
                  restaurant={restaurant}
                  menu={menu}
                  recruiter={nickname}
                  recruit={partNum}
                  recruited={nowNum}
                  timer={calculatePostRemainingTime(createdAt)}
                  cost={price}
                />
              ))}
            </div>
          </div>
        ) : (
          <h1 id="inner-wrap" style={{ color: 'darkgreen' }}>
            아직 게시글이 없습니다.
          </h1>
        )}
      </div>{' '}
    </>
  );
};
