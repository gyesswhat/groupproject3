import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../header';

export function Login() {
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
    navigate('/');
  };

  return (
    <div id="login-page-whole">
      <div id="login-left">
        <div id="logo">
          <Logo />
        </div>
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
        </div>
      </div>
      <div id="login-right">
        <img src="/assets/login-right-img1.svg" id="login-right-img1" alt="Login" />
        <img src="/assets/login-right-img3.svg" id="login-right-img2" alt="Login" />
        <h3>배달비 걱정 없이 주문하세요!</h3>
        <p>이화 공유배달은 배달 주문을 다른 사람과 공유하여 음식을 남긴다는 걱정 없이</p>
        <p>배달비는 절감할 수 있는 신개념 공유 배달 시스템입니다.</p>
      </div>
    </div>
  );
}
