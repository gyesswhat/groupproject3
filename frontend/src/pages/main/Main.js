import '../../App.css';
import Posts from './Posts';
import FoodTypes from './FoodType';
import Logo from './Logo';

export default function Main() {
  return (
    <>
      <div id="topbar">
        <Logo />
        <ul id="topmenu">
          <li>
            <a href="/">홈</a>
          </li>
          <li>
            <a href="/mypage">마이페이지</a>
          </li>
        </ul>
      </div>
      <div id="container">
        <div id="posts">
          <div id="post">
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
}
