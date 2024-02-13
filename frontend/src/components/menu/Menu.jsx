import { useState } from 'react';
import { FoodTypeItem } from './FoodTypeItem';
import { FOOD_TYPE_LIST } from './menu.const';
import * as S from './menu.style';

export const Menu = ({ onFoodTypeChange }) => {
  const [selectedFoodType, setSelectedFoodType] = useState('');

  const handleFoodTypeClick = clickedId => {
    // 클릭된 음식 카테고리가 이미 선택된 상태면 해제, 아니면 선택
    setSelectedFoodType(prevSelected => (prevSelected === clickedId ? '' : clickedId));

    // 선택된 음식 카테고리를 상위 컴포넌트로 전달
    onFoodTypeChange(prevSelected => (prevSelected === clickedId ? '' : clickedId));
  };

  return (
    <S.Menu>
      {FOOD_TYPE_LIST.map(({ id, food }) => (
        <FoodTypeItem
          key={id}
          id={id}
          food={food}
          selected={selectedFoodType === id}
          onFoodTypeClick={handleFoodTypeClick}
        />
      ))}
    </S.Menu>
  );
};
