import React, { useState } from 'react';

// 각 함께 배달할 사람 모집글을 나타내는 컴포넌트
const DeliveryRecruitmentItem = ({ title, description, recruiter, applicants }) => (
  <div className="delivery-recruitment-item">
    <h3>{title}</h3>
    <p>{description}</p>
    <p>모집자: {recruiter}</p>
    <p>지원자: {applicants.join(', ')}</p>
  </div>
);

// 메인 화면에서 사용자가 작성한 함께 배달할 사람 모집글을 보여주는 컴포넌트
const MainScreen = () => {
  // 가상의 함께 배달할 사람 모집글 데이터
  const dummyDeliveryRecruitments = [
    {
      id: 1,
      title: '같이 점심 식사하실 분 찾습니다',
      description: '회사 근처 맛있는 음식점에서 같이 점심을 먹을 분을 찾습니다.',
      recruiter: '사용자1',
      applicants: ['지원자1', '지원자2'],
    },
    {
      id: 2,
      title: '주말에 함께 산책할 친구 찾아요',
      description: '주말에 함께 산책하면서 얘기 나눌 친구를 찾습니다.',
      recruiter: '사용자2',
      applicants: ['지원자3', '지원자4', '지원자5'],
    },
    // 추가적인 모집글 데이터를 필요에 따라 추가할 수 있습니다.
  ];

  return (
    <div className="main-screen">
      <h1>함께 배달할 사람 모집글</h1>
      <div className="delivery-recruitment-list">
        {dummyDeliveryRecruitments.map((deliveryRecruitment) => (
          <DeliveryRecruitmentItem
            key={deliveryRecruitment.id}
            title={deliveryRecruitment.title}
            description={deliveryRecruitment.description}
            recruiter={deliveryRecruitment.recruiter}
            applicants={deliveryRecruitment.applicants}
          />
        ))}
      </div>
    </div>
  );
};

export default MainScreen;