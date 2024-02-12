import Logo from './Logo';

export default function Topbar() {
  return (
    <div id="topbar">
      <a href="/">
        <Logo />
      </a>
      <ul id="topmenu">
        <li>
          <a href="login">로그아웃</a>
        </li>
        <li>
          <a href="/">홈</a>
        </li>
        <li>
          <a href="/mypage">마이페이지</a>
        </li>
      </ul>
    </div>
  );
}
