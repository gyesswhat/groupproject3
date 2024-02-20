import { useState, useEffect } from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Register,
  Login,
  Main,
  PostDetail,
  PostForm,
  OrderFailed,
  MyPage,
  ProfilePage,
  OrdersPage,
} from './components';
import { fakeUser } from './Fakeuser';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await fakeUser.loggedIn;
      setLoggedIn(user);

      if (user) {
        const userNickname = user.nickname;
        console.log(`사용자 닉네임: ${userNickname}`);
      } else {
        console.log('사용자 데이터를 가져올 수 없습니다.');
      }
    };

    checkUser();
  }, []);

  if (loggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {loggedIn ? <Route path="/" element={<Main />} /> : <Route path="/" element={<Navigate to="/login" />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/recruit" element={<PostForm />} />
        <Route path="/post/:postId/order-failed" element={<OrderFailed />} />
        <Route path="/mypage/profile" element={<ProfilePage />} />
        <Route path="/mypage/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
