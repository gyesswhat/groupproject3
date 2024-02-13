import * as S from './menu.style';

export const FoodTypeItem = ({ id, food, selected, onFoodTypeClick }) => (
  <S.FoodTypeItem onClick={() => onFoodTypeClick(id)} className={selected ? 'selected' : ''} id="clickAvailable">
    <img src={`/assets/${id}-icon.svg`} alt={`/${food}`} />
    <p>{food}</p>
  </S.FoodTypeItem>
);
