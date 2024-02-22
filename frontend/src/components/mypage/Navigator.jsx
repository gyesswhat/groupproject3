import { NavLink } from 'react-router-dom';

export const Navigator = () => {
  return (
    <ul>
      <li>
        <NavLink to="/mypage/profile" activeclassname="active">
          <div id="nav">
            <div id="nav-icon">
              <img src="/assets/nav-icon1.svg" alt="icon" />
            </div>
            <div>
              <h2>내 정보</h2> <p>정보 확인 및 수정</p>
            </div>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/mypage/orders" activeclassname="active">
          <div id="nav">
            <div id="nav-icon">
              <img src="/assets/nav-icon2.svg" alt="icon" />
            </div>
            <div>
              <h2>주문 히스토리</h2> <p>주문 내역</p>
            </div>
          </div>
        </NavLink>
      </li>
    </ul>
  );
};
