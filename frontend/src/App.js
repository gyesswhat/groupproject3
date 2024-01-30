import React from 'react';
import './App.css';
import MainScreen from './Posts';
import DropdownExample from './PlaceDropdown';
import Test from './test';
import Login from './Login';

function App() {
  
  return (
    <>
    <div id="topbar">
      <div id="title">
        <h3>이화</h3>
        <h3 id="green">공유배달</h3>
      </div>
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
      <div id="foodtype">
        <a href='/western'>
          <img src="/search-icon.png"/>
          <p>양식</p>
        </a>
        <a href='/franchise'>
          <img src="/search-icon.png"/>
          <p>프랜차이즈</p>
        </a>
        <a href='/korean'>
          <img src="/search-icon.png"/>
          <p>한식</p>
        </a>
        <a href='/japanese'>
          <img src="/search-icon.png"/>
          <p>일식</p>
        </a>
        <a href='/vegan'>
          <img src="/search-icon.png"/>
          <p>비건, 채식</p>
        </a>
        <a href='/dessert'>
          <img src="/search-icon.png"/>
          <p>디저트</p>
        </a>
      </div>
      <div id="place">
        <h2>현재, </h2>
          <DropdownExample/>
        <h2> 내에서 모집 중인 주문은...</h2>
      </div>
      <div id="posts">
        <div id="post">
          <MainScreen/>
        </div>
      </div>
    </div>
    <Test/>
    <div>
    <Login/></div>
    </>
  );
}

export default App;