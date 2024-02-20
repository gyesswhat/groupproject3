import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, PlaceDropdown } from '../menu';
import { DeliveryItem } from './DeliveryItem';
import { dummyDeliveryRecruitment } from './posts.const';

const API_URL = 'http://15.164.98.46:8080';

export const Posts = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFoodType, setSelectedFoodType] = useState('');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(123, response);
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  console.log('posts:', posts);

  const handleBuildingChange = selectedValue => {
    setSelectedBuilding(selectedValue);
  };

  const handleFoodTypeChange = selectedValue => {
    setSelectedFoodType(selectedValue);
  };

  const filteredDeliveryRecruitment = dummyDeliveryRecruitment.filter(
    DeliveryR =>
      (!selectedBuilding || DeliveryR.building === selectedBuilding) &&
      (!selectedFoodType || DeliveryR.foodtype === selectedFoodType) &&
      DeliveryR.isValid === 3,
  );

  return (
    <>
      <Menu onFoodTypeChange={handleFoodTypeChange} />
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
      <div id="main-screen">
        <div id="delivery-recruitment-list">
          {filteredDeliveryRecruitment.map(({ id, restaurant, menu, recruiter, recruit, recruited, timer, cost }) => (
            <DeliveryItem
              key={id}
              id={id}
              restaurant={restaurant}
              menu={menu}
              recruiter={recruiter}
              recruit={recruit}
              recruited={recruited}
              timer={timer}
              cost={cost}
            />
          ))}
        </div>
      </div>
    </>
  );
};
