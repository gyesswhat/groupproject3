import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

function Login() {
  const [inputs, setInputs] = useState({
    userId: '',
    userPw: '',
  });

  const { userId, userPw } = inputs;
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/main');
  };

  return (
    <div id="login-page-whole">
      <Logo />
      <div id="login-page">
        <div id="login">
          <div id="welcome">
            <strong> 어서오세요!</strong>
            공유 배달 시스템 '이화 공유배달'에 오신 것을 환영합니다.
          </div>
          <div id="login-register">
            <form id="id-pw" onSubmit={handleSubmit}>
              <p>이메일</p>
              <input
                id="id"
                type="text"
                name="userId"
                placeholder="@ewhain.net"
                value={userId}
                onChange={handleInputChange}
              />
              <p>비밀번호</p>
              <input
                id="pw"
                type="password"
                name="userPw"
                placeholder="비밀번호"
                value={userPw}
                onChange={handleInputChange}
              />
              <button type="submit" id="login-button">
                로그인
              </button>
            </form>

            <Link to="/register" id="register-button">
              <span>아직 계정이 없으신가요?</span> <div id="green">회원가입</div>
            </Link>
          </div>
        </div>
        <div id="login-right">
          <img src="/assets/login-right-img.svg" id="login-right-img" alt="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
