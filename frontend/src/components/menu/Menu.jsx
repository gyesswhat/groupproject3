import { useState } from 'react';
import { FoodTypeItem } from './FoodTypeItem';
import { FOOD_TYPE_LIST } from './menu.const';
import * as S from './menu.style';

export const Menu = ({ onFoodTypeChange }) => {
  const [selectedFoodType, setSelectedFoodType] = useState('');

  const handleFoodTypeClick = clickedId => {
    setSelectedFoodType(prevSelected => (prevSelected === clickedId ? '' : clickedId));
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
