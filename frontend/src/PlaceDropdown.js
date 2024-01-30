import React, { useState, useEffect } from 'react';

const DropdownExample = () => {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // 페이지 로드 시 저장된 값을 확인하여 초기 선택 상태를 설정
    const storedOption = localStorage.getItem('selectedOption');
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  const handleOptionChange = event => {
    const selectedValue = event.target.value;

    // 선택한 옵션을 localStorage에 저장
    localStorage.setItem('selectedOption', selectedValue);

    // 선택한 옵션에 따라 다른 페이지로 이동 또는 다른 컴포넌트를 보여줄 수 있습니다.
    switch (selectedValue) {
      case 'hanwoori':
        // 예시: 선택한 옵션이 'option1'일 때 다른 페이지로 이동
        window.location.href = '/hanwoori';
        break;
      case 'ehouse':
        // 예시: 선택한 옵션이 'option2'일 때 다른 페이지로 이동
        window.location.href = '/ehouse';
        break;
      case 'ihouse':
        window.location.href = '/ihouse';
        break;
      case 'studentunion':
        window.location.href = '/studentunion';
        break;
      case 'library':
        window.location.href = '/library';
        break;
      case 'others':
        window.location.href = '/others';
        break;

      // 추가적인 경우에 따라 다른 페이지로 이동 또는 다른 컴포넌트를 보여줄 수 있습니다.
      default:
        break;
    }
  };

  return (
    <div>
      <select id="building" value={selectedOption} onChange={handleOptionChange}>
        <option value="hanwoori">한우리집</option>
        <option value="ehouse">이하우스</option>
        <option value="ihouse">아이하우스</option>
        <option value="studentunion">학생문화관</option>
        <option value="library">중앙도서관</option>
        <option value="others">교외</option>
      </select>
    </div>
  );
};

export default DropdownExample;
