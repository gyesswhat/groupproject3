import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    accountNumber: '',
    bank: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // 회원가입 처리 코드 작성
    console.log(formData);
    // 회원가입 처리 후 다음 페이지로 이동
    navigate('/main');
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
              />
            </div>
            <div>
              <label>비밀번호</label>
              <input id="pw" type="password" name="password" value={formData.password} onChange={handleChange} />
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
              />
            </div>
            <div>
              <label>계좌번호</label>
              <input id="id" type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
            </div>
            <div>
              <label>은행</label>
              <select id="id" name="bank" value={formData.bank} onChange={handleChange}>
                <option selected hidden value="select">
                  은행 선택
                </option>
                <option value="카카오뱅크">카카오뱅크</option>
                <option value="케이뱅크">케이뱅크</option>
                <option value="토스뱅크">토스뱅크</option>
                <option value="하나은행">하나은행</option>
                <option value="제일은행">제일은행</option>
                <option value="국민은행">국민은행</option>
                <option value="신한은행">신한은행</option>
                <option value="외환은행">외환은행</option>
                <option value="우리은행">우리은행</option>
                <option value="한국시티은행">한국시티은행</option>
                <option value="경남은행">경남은행</option>
                <option value="광주은행">광주은행</option>
                <option value="대구은행">대구은행</option>
                <option value="부산은행">부산은행</option>
                <option value="전북은행">전북은행</option>
                <option value="제주은행">제주은행</option>
                <option value="기업은행">기업은행</option>
                <option value="농협">농협</option>
                <option value="수협">수협</option>
                <option value="한국산업은행">한국산업은행</option>
              </select>
            </div>
            <button type="submit" id="register-submit">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
