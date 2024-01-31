import React from 'react';
import './App.css';
import Posts from './Posts';
import DropdownExample from './PlaceDropdown';
import FoodTypes from './FoodType';
import Logo from './Logo';

function MainScreen() {
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
        <FoodTypes />
        <div id="place">
          <div id="place-text">
            <h2>현재, </h2>
            <DropdownExample />
            <h2> 내에서 모집 중인 주문은...</h2>
          </div>
          <div id="recruit-button">
            <a href="/recruit">배달팟 모집</a>
          </div>
        </div>
        <div id="posts">
          <div id="post">
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainScreen;
