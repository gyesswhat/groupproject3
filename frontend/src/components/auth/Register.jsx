import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../header';
import { BankOptions } from './BankOptions';
import axios from 'axios';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    accountNumber: '',
    bank: '',
  });

  const [emailValid, setEmailValid] = useState(true);
  const [nickValid, setNickValid] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'email') {
      setEmailValid(value.endsWith('@ewhain.net'));
    }

    if (name === 'nickname') {
      setNickValid(value.length <= 10);
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!emailValid || !nickValid) {
      return;
    }

    try {
      const response = await axios.post('/register', formData);
      console.log('Registration successful:', response.data);
      setIsSnackbarOpen(true); // 회원가입 성공 시 스낵바 열기
      setTimeout(() => {
        setIsSnackbarOpen(false); // 일정 시간 후 스낵바 닫기
      }, 3000); // 3초 후에 자동으로 닫힘
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <Logo />
      <div id="register-box">
        <div id="register">
          <div id="register-title">
            <h1>회원가입</h1>
          </div>
          <form onSubmit={handleSubmit} id="register-form">
            <div>
              <label>이화인 이메일</label>
              <input
                id="id"
                type="email"
                name="email"
                value={formData.email}
                placeholder="@ewhain.net"
                onChange={handleChange}
                required
              />
              {!emailValid && <span>이화인 이메일을 입력하세요.</span>}
            </div>
            <div>
              <label>비밀번호</label>
              <input
                id="pw"
                type="password"
                name="password"
                value={formData.password}
                placeholder="알파벳과 숫자만 입력"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>닉네임</label>
              <input
                id="id"
                type="text"
                name="nickname"
                value={formData.nickname}
                placeholder="10자 이내"
                onChange={handleChange}
                required
              />
              {!nickValid && <span>10자 이내로 입력하세요.</span>}
            </div>
            <div>
              <label>계좌번호</label>
              <input
                id="id"
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>은행</label>
              <select id="id" name="bank" value={formData.bank} onChange={handleChange} required>
                <option selected hidden value="select">
                  은행 선택
                </option>
                <BankOptions />
              </select>
            </div>
            {(!emailValid || !nickValid) && <span>입력한 정보를 확인하세요.</span>}
            <button type="submit" id="register-submit">
              회원가입
            </button>
          </form>
        </div>
      </div>
      {isSnackbarOpen && (
        <div className="snackbar">
          <button onClick={handleSnackbarClose} id="x">
            X
          </button>
          회원가입에 성공했습니다.
        </div>
      )}
    </>
  );
};
