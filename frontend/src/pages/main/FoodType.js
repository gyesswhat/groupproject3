import { useState } from 'react';
import { FOOD_TYPE_LIST } from './main.const';

const FoodTypeItem = ({ id, food, selected, onFoodTypeClick }) => (
  <div onClick={() => onFoodTypeClick(id)} className={selected ? 'selected' : ''} id="clickAvailable">
    <img src={`/assets/${id}-icon.svg`} alt={`/${food}`} />
    <p>{food}</p>
  </div>
);

const FoodTypes = ({ onFoodtypeChange }) => {
  const [selectedFoodType, setSelectedFoodType] = useState('');

  const handleFoodTypeClick = clickedId => {
    // 클릭된 음식 카테고리가 이미 선택된 상태면 해제, 아니면 선택
    setSelectedFoodType(prevSelected => (prevSelected === clickedId ? '' : clickedId));

    // 선택된 음식 카테고리를 상위 컴포넌트로 전달
    onFoodtypeChange(prevSelected => (prevSelected === clickedId ? '' : clickedId));
  };

  return (
    <div id="foodtype">
      {FOOD_TYPE_LIST.map(({ id, food }) => (
        <FoodTypeItem id={id} food={food} selected={selectedFoodType === id} onFoodTypeClick={handleFoodTypeClick} />
      ))}
    </div>
  );
};

export default FoodTypes;
