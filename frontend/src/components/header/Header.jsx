import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export function Header() {
  const handleLogout = () => {
    // 세션 클리어
    sessionStorage.clear();
  };

  return (
    <div id="topbar">
      <div>
        <Link to="/">
          <Logo />
        </Link>
        <ul id="topmenu">
          <li>
            <Link to="/login" style={{ color: '#007B40' }} onClick={handleLogout}>
              로그아웃
            </Link>
          </li>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/mypage/profile">마이페이지</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
