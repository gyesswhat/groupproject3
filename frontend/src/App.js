import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main, Login, Register, PostDetail, Navigate } from './pages';

// TODO: Router 추가 (시작화면=로그인 페이지)
function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      setLoggedIn(user);
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
        <Route path="/:postId" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
