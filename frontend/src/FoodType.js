import React from 'react';

const FoodTypeItem = ({ id, food }) => (
  <a href={`/${id}`}>
    <img src={`/assets/${id}-icon.svg`} alt={`/${food}`} />
    <p>{food}</p>
  </a>
);

const FoodTypes = () => {
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

  return (
    <div id="foodtype">
      {FoodTypeList.map(FoodType => (
        <FoodTypeItem id={FoodType.id} food={FoodType.food} />
      ))}
    </div>
  );
};

export default FoodTypes;
