import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { fakeUser } from './Fakeuser';
import { Login, Main, OrderFailed, OrdersPage, PostDetail, PostForm, ProfilePage, Register } from './components';

export function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  const currentUserId = sessionStorage.getItem('userId');
  useEffect(() => {
    if (currentUserId !== null) {
      setLoggedIn(true);
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
