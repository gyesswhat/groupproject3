import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PlaceDropdown } from '../menu';
import { Menu } from '../menu';
import { DeliveryItem } from './DeliveryItem';
import { dummyDeliveryRecruitment } from './posts.const';

export const Posts = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFoodType, setSelectedFoodType] = useState('');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

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
