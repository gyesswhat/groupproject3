import { useState } from 'react';
import DropdownExample from './PlaceDropdown';

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
  const dummyDeliveryRecruitments = [
    {
      id: 1,
      restaurant: '여우골 서교점',
      menu: '연어 세트',
      timer: 2,
      recruited: 3,
      recruit: 4,
      cost: 12800,
      recruiter: '폼폼푸린',
      foodtype: 'japanese',
      building: 'hanwoori',
    },
    {
      id: 2,
      restaurant: 'BBQ 신촌점',
      menu: '황금올리브치킨',
      timer: 5,
      recruited: 2,
      recruit: 3,
      cost: 8500,
      recruiter: '이화',
      foodtype: 'franchise',
      building: 'ehouse',
    },
  ];

  // TODO: 필터 함수 코드 추가:

  const [selectedBuilding, setSelectedBuilding] = useState('');

  const handleBuildingChange = selectedValue => {
    setSelectedBuilding(selectedValue);
  };

  const filteredDeliveryRecruitments = dummyDeliveryRecruitments.filter(
    deliveryRecruitment => !selectedBuilding || deliveryRecruitment.building === selectedBuilding,
  );

  return (
    <>
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
