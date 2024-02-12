import React from 'react';
import Posts from './Posts';
import Topbar from './Topbar';
import '../../App.css';

function MainScreen() {
  return (
    <>
      <Topbar />
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

export default MainScreen;
