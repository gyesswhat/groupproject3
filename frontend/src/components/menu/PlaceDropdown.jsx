import { useState } from 'react';
import { BUILDING_LIST } from '../main/main.const';

export function PlaceDropdown({ onBuildingChange }) {
  const [selectedBuilding, setSelectedBuilding] = useState('');

  const handleBuildingChange = e => {
    const selectedValue = e.target.value;
    setSelectedBuilding(selectedValue);
    onBuildingChange(selectedValue);
  };

  return (
    <div>
      <select id="building" onChange={handleBuildingChange} value={selectedBuilding}>
        <option value="">전체</option>
        {BUILDING_LIST.map(building => (
          <option key={building} value={building}>
            {building}
          </option>
        ))}
        ;
      </select>
    </div>
  );
}
