import React from 'react';
import './App.css';
import Posts from './Posts';
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