import { useState } from 'react';
import DropdownExample from './PlaceDropdown';
import FoodTypes from './FoodType';
import { dummyDeliveryRecruitments } from './posts.const';

const DeliveryRecruitmentItem = ({ id, restaurant, menu, timer, recruit, recruited, cost, recruiter }) => (
  <a id="delivery-recruitment-item" href={`/${id}`}>
    <h4>
      [{restaurant}] {menu}
    </h4>
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
    <div id="recruiter-cost">
      <p>{recruiter}</p>
      <div id="cost">
        <p id="green">배달비 포함</p> <h4>{cost}</h4> <p>원</p>
      </div>
    </div>
  </a>
);

const Posts = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('');

  const handleBuildingChange = selectedValue => {
    setSelectedBuilding(selectedValue);
  };

  const [selectedFoodtype, setSelectedFoodtype] = useState('');

  const handleFoodtypeChange = selectedValue => {
    setSelectedFoodtype(selectedValue);
  };

  const filteredDeliveryRecruitments = dummyDeliveryRecruitments.filter(
    deliveryRecruitment =>
      (!selectedBuilding || deliveryRecruitment.building === selectedBuilding) &&
      (!selectedFoodtype || deliveryRecruitment.foodtype === selectedFoodtype),
  );

  return (
    <>
      <FoodTypes onFoodtypeChange={handleFoodtypeChange} />
      <div id="place">
        <div id="place-text">
          <h2>현재, </h2>
          <DropdownExample onBuildingChange={handleBuildingChange} />
          <h2> 내에서 모집 중인 주문은...</h2>
        </div>
        <div id="recruit-button">
          <a href="/recruit">배달팟 모집</a>
        </div>
      </div>
      <div id="main-screen">
        <div id="delivery-recruitment-list">
          {filteredDeliveryRecruitments.map(({ id, restaurant, menu, recruiter, recruit, recruited, timer, cost }) => (
            <DeliveryRecruitmentItem
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

export default Posts;
