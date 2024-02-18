import { useState } from 'react';

export const PostContents = ({ restaurant, menu, timer, recruit, recruited, cost, building, account, content }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleButtonClick = () => {
    setButtonDisabled(true); // 버튼 비활성화
    setIsJoined(true);
    // const userId = sessionStorage.getItem('userId');
  };

  return (
    <div id="postcontent">
      <div id="main-content">
        <div id="recruiter-cost">
          <h4>
            [{restaurant}] {menu}
          </h4>
          <div id="cost-recruit">
            <div id="cost">
              <p id="green">배달비 포함</p> <h4>{cost}</h4> <p>원</p>
            </div>
            <button type="submit" onClick={handleButtonClick} disabled={isButtonDisabled}>
              참여하기
            </button>
          </div>
        </div>
        <div id="info">
          <img src="/assets/timer-icon.svg" alt="timer" />
          <p id="green">{timer}분</p>
          <p> 뒤 주문 예정</p>
          <p className="dot" id="green">
            •
          </p>
          <p>모집 인원</p>
          <p id="green">
            {recruited}/{recruit}
          </p>
        </div>
        <div id="where">
          <p>배달받을 장소:</p> <p id="green">{building}</p>
        </div>
        {isJoined && (
          <div id="where">
            <p>계좌 정보:</p> <p id="green">{account}</p>
          </div>
        )}

        <p id="post-content">{content}</p>
      </div>
    </div>
  );
};
