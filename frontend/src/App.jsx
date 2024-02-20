import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { fakeUser } from './Fakeuser';
import { Login, Main, OrderFailed, OrdersPage, PostDetail, PostForm, ProfilePage, Register } from './components';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  /*useEffect(() => {
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
  }, []);*/

  const currentUserId = sessionStorage.getItem('userId');
  useEffect(() => {
    if (currentUserId !== null) {
      setLoggedIn(true);
      console.log(currentUserId);
      console.log(loggedIn);
    } else {
      setLoggedIn(false);
    }
  }, [currentUserId, loggedIn]);

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
