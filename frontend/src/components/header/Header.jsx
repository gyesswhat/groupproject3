import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div id="topbar">
      <Link to="/">
        <Logo />
      </Link>
      <ul id="topmenu">
        <li>
          <Link to="login">로그아웃</Link>
        </li>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/mypage">마이페이지</Link>
        </li>
      </ul>
    </div>
  );
}
