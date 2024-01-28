import React, { useState } from 'react';

// 각 함께 배달할 사람 모집글을 나타내는 컴포넌트
const DeliveryRecruitmentItem = ({ restaurant, menu, timer, recruit, recruited, cost, recruiter }) => (
  <div className="delivery-recruitment-item">
    <h3>[{restaurant}] {menu}</h3>
    <p>{timer}분 뒤 주문 예정</p>
    <p>모집 인원 {recruited}/{recruit}</p>
    <p>{recruiter}</p>
    <p>배달비 포함 {cost}원</p>
    
  </div>
);

// 메인 화면에서 사용자가 작성한 함께 배달할 사람 모집글을 보여주는 컴포넌트
const MainScreen = () => {
  // 가상의 함께 배달할 사람 모집글 데이터
  const dummyDeliveryRecruitments = [
    {
      id: 1,
      restaurant: '여우골 서교점',
      menu: '연어 세트',
      timer: 2,
      recruited: 3,
      recruit: 4,
      cost: 12800,
      recruiter: '폼폼푸린'
    },
    {
      id: 2,
      restaurant: 'BBQ 신촌점',
      menu: '황금올리브치킨',
      timer: 5,
      recruited: 2,
      recruit: 3,
      cost: 8500,
      recruiter: '이화'
    },
    // 추가적인 모집글 데이터를 필요에 따라 추가할 수 있습니다.
  ];

  return (
    <div className="main-screen">
      <div className="delivery-recruitment-list">
        {dummyDeliveryRecruitments.map((deliveryRecruitment) => (
          <DeliveryRecruitmentItem
            key={deliveryRecruitment.id}
            restaurant={deliveryRecruitment.restaurant}
            menu={deliveryRecruitment.menu}
            recruiter={deliveryRecruitment.recruiter}
            recruit={deliveryRecruitment.recruit}
            recruited={deliveryRecruitment.recruited}
            timer={deliveryRecruitment.timer}
            cost={deliveryRecruitment.cost}

          />
        ))}
      </div>
    </div>
  );
};

export default MainScreen;