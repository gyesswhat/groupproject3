import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate, Redirect } from 'react-router-dom';
import { Logo } from '../header';

export function Login() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const [success, setSuccess] = useState(true);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });

      console.log(response);
      if (response.status === 200) {
        sessionStorage.setItem('userId', response.data);
        console.log('success');
        window.location.href = '/';
      }

      if (response.status === 300 || response.status === 400) {
        setSuccess(false);
        console.log('error');
      }
    } catch (error) {
      setSuccess(false);
      console.error('Login failed:', error);
    }
  };

  return (
    <div id="login-page-whole">
      <div id="login-left">
        <div id="logo" style={{ marginLeft: '100px' }}>
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
                  name="email"
                  placeholder="@ewhain.net"
                  value={email}
                  onChange={handleInputChange}
                />
                <p>비밀번호</p>
                <input
                  id="pw"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={handleInputChange}
                />
                {!success && <span>아이디 또는 비밀번호를 확인하세요.</span>}
                <button type="submit" id="login-button">
                  로그인
                </button>
              </form>
              <Link to="/register" id="register-button">
                <p>아직 계정이 없으신가요?</p> <div id="green">회원가입</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="login-right">
        {/*<img src="/assets/login-right-img1.svg" id="login-right-img1" alt="Login" />
        <img src="/assets/login-right-img3.svg" id="login-right-img2" alt="Login" />
        <h3>배달비 걱정 없이 주문하세요!</h3>
        <p>이화 공유배달은 배달 주문을 다른 사람과 공유하여 음식을 남긴다는 걱정 없이</p>
  <p>배달비는 절감할 수 있는 신개념 공유 배달 시스템입니다.</p>*/}
        <img src="/assets/login-right-img.svg" id="login-right-img" alt="Login" />
      </div>
    </div>
  );
}
