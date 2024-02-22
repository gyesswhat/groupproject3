import { FOOD_TYPE_LIST } from '../menu';

export function MenuDropdownW({ value, onChange, name }) {
  const handleSelectChange = event => {
    onChange(event.target.value);
  };
  return (
    <>
      <option value="" hidden>
        선택
      </option>
      {FOOD_TYPE_LIST.map(({ id, food }) => (
        <option key={id} value={id}>
          {food}
        </option>
      ))}
      ;
    </>
  );
}
