import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import MainScreen from './MainScreen';

// Router 추가 (시작화면=로그인 페이지)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
