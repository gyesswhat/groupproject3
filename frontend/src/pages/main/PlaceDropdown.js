import { useState } from 'react';

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
        <option value="hanwoori">한우리집</option>
        <option value="ehouse">이하우스</option>
        <option value="ihouse">아이하우스</option>
        <option value="studentunion">학생문화관</option>
        <option value="library">중앙도서관</option>
        <option value="others">교외</option>
      </select>
    </div>
  );
}
