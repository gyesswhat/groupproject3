import { useState, useEffect } from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import getUser from './Fakeuser';

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
      </Routes>
    </Router>
  );
}

export default App;
