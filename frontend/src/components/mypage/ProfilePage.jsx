import { MyPage } from './MyPage';
import { BankOptions } from '../auth';
import { fakeUser } from '../../Fakeuser';
import { Header } from '../header';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const ProfilePage = () => {
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    account: '',
    bank: '',
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.patch('/user', userData);

      setIsSnackbarOpen(true);
      setTimeout(() => {
        setIsSnackbarOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div>
      <Header />
      <div id="flex-row" style={{ justifyContent: 'center' }}>
        <MyPage />

        <div id="inner-wrap">
          <div id="register">
            <h3>내 정보</h3>
            <form id="recruit-form" onSubmit={handleSubmit}>
              <div id="flex-row">
                <div id="flex-col">
                  <label>이메일</label>
                  <input id="id" readOnly value={fakeUser.email} disabled />
                </div>
              </div>
              <div id="flex-row">
                <div id="flex-col">
                  <label>닉네임</label>
                  <input id="id" type="text" name="nickname" value={fakeUser.nickname} onChange={handleInputChange} />
                </div>
              </div>
              <div id="flex-row">
                <div id="flex-col">
                  <label>계좌 정보</label>
                  <input id="id" type="number" name="account" value={fakeUser.account} onChange={handleInputChange} />
                </div>

                <div id="flex-col">
                  <label>은행</label>
                  <select name="bank" value={fakeUser.bank} id="id" onChange={handleInputChange}>
                    <BankOptions />
                  </select>
                </div>
              </div>
              <div id="profile-bottom">
                <button type="submit">저장</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isSnackbarOpen && (
        <div className="snackbar">
          <button onClick={handleSnackbarClose} id="x">
            x
          </button>
          정보 수정이 완료되었습니다.
        </div>
      )}
    </div>
  );
};
