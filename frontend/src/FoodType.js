import React, { useState } from 'react';

const FoodTypeItem = ({ id, food, selected, onFoodTypeClick }) => (
  <div onClick={() => onFoodTypeClick(id)} className={selected ? 'selected' : ''} id="clickAvailable">
    <img src={`/assets/${id}-icon.svg`} alt={`/${food}`} />
    <p>{food}</p>
  </div>
);

const FoodTypes = ({ onFoodtypeChange }) => {
  const FoodTypeList = [
    {
      id: 'western',
      food: '양식',
    },
    {
      id: 'franchise',
      food: '프랜차이즈',
    },
    {
      id: 'korean',
      food: '한식',
    },
    {
      id: 'japanese',
      food: '일식',
    },
    {
      id: 'vegan',
      food: '채식',
    },
    {
      id: 'dessert',
      food: '디저트',
    },
  ];

  const [selectedFoodType, setSelectedFoodType] = useState('');

  const handleFoodTypeClick = clickedId => {
    // 클릭된 음식 카테고리가 이미 선택된 상태면 해제, 아니면 선택
    setSelectedFoodType(prevSelected => (prevSelected === clickedId ? '' : clickedId));

    // 선택된 음식 카테고리를 상위 컴포넌트로 전달
    onFoodtypeChange(prevSelected => (prevSelected === clickedId ? '' : clickedId));
  };

  return (
    <div id="foodtype">
      {FoodTypeList.map(({ id, food }) => (
        <FoodTypeItem id={id} food={food} selected={selectedFoodType === id} onFoodTypeClick={handleFoodTypeClick} />
      ))}
    </div>
  );
};

export default FoodTypes;
