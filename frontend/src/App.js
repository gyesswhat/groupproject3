import React from 'react';
import SearchBar from './searchbar'; 
import './App.css';
import MainScreen from './Posts';

function App() {
  const handleSearch = (searchTerm) => {
    console.log('검색어:', searchTerm);
  };

  return (
    <>
    <div id="topbar">
      <div id="title">
        <h3>이화</h3>
        <h3 id="green">공유배달</h3>
      </div>
      <div id="search">
        <SearchBar onSearch={handleSearch}/>
      </div>
      <ul id="topmenu">
        <li>
          <a href="/">홈</a>
        </li>
        <li>
          <a href="/order">주문 내역</a>
        </li>
        <li>
          <a href="/mypage">마이페이지</a>
        </li>
      </ul>
      <div id="account">
        <a href="/notice">알림</a>
      </div>
    </div>
    <div id="container">
      <div id="foodtype">
        <a href='/'>
          <img src="/search-icon.png"/>
          <p>양식</p>
        </a>
        <a href='/'>
          <img src="/search-icon.png"/>
          <p>프랜차이즈</p>
        </a>
        <a href='/'>
          <img src="/search-icon.png"/>
          <p>한식</p>
        </a>
        <a href='/'>
          <img src="/search-icon.png"/>
          <p>일식</p>
        </a>
        <a href='/'>
          <img src="/search-icon.png"/>
          <p>비건, 채식</p>
        </a>
        <a href='/'>
          <img src="/search-icon.png"/>
          <p>디저트</p>
        </a>
      </div>
      <div id="place">
        <h2>현재, </h2>
        <select id="building">
          <option value="hanwoori" selected>한우리집</option>
          <option value="ehouse">이하우스</option>
          <option value="ihouse">아이하우스</option>
          <option value="studentunion">학생문화관</option>
          <option value="library">중앙도서관</option>
        </select>
        <h2> 내에서 모집 중인 주문은...</h2>
      </div>
      <div id="posts">
        <div id="post">

        </div>
      </div>
    </div>
    </>
  );
}

export default App;