import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../header';
import { BANK_LIST } from './auth.const';

export const Register = () => {
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

  const BankOptions = () => (
    <>
      {BANK_LIST.map((bank, index) => (
        <option key={index} value={bank}>
          {bank}
        </option>
      ))}
    </>
  );

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
                {BANK_LIST.map((bank, index) => (
                  <option key={index} value={bank}>
                    {bank}
                  </option>
                ))}
                ;
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
