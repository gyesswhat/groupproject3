import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div id="topbar">
      <div>
        <Link to="/">
          <Logo />
        </Link>
        <ul id="topmenu">
          <li>
            <Link to="/login" style={{ color: '#007B40' }}>
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
