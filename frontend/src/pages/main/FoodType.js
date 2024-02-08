import { FOOD_TYPE_LIST } from './main.const';

const FoodTypeItem = ({ id, food }) => (
  <a href={`/${id}`}>
    <img src={`/assets/${id}-icon.svg`} alt={`/${food}`} />
    <p>{food}</p>
  </a>
);

const FoodTypes = () => (
  <div id="foodtype">
    {FOOD_TYPE_LIST.map(({ id, food }) => (
      <FoodTypeItem key={id} id={id} food={food} />
    ))}
  </div>
);

export default FoodTypes;
