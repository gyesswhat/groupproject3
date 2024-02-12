import { useState } from 'react';
import { BUILDING_LIST } from './building.const';

// TODO: window.location.href switch문 삭제 ('Posts.js'에 필터링 함수 추가):
export default function DropdownExample({ onBuildingChange }) {
  const [selectedBuilding, setSelectedBuilding] = useState('');

  const handleBuildingChange = e => {
    const selectedValue = e.target.value;
    setSelectedBuilding(selectedValue);
    onBuildingChange(selectedValue);
  };

  // FIXME: const 파일로 빼기
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
