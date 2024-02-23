import { BUILDING_LIST } from '../main/main.const';

export function PlaceDropdownW() {
  return (
    <>
      <option value="" hidden>
        선택
      </option>
      {BUILDING_LIST.map(building => (
        <option key={building} value={building}>
          {building}
        </option>
      ))}
      ;
    </>
  );
}
