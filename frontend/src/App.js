import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main, Login } from './pages';

// TODO: Router 추가 (시작화면=로그인 페이지)
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
