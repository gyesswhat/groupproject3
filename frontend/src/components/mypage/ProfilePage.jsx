import { MyPage } from './MyPage';
import { BankOptions } from '../auth';
import { fakeUser } from '../../Fakeuser';
import { Header } from '../header';

export const ProfilePage = () => {
  return (
    <div>
      <Header />
      <div id="flex-row">
        <MyPage />

        <div id="inner-wrap">
          <div id="register">
            <h3>내 정보</h3>
            <form id="recruit-form">
              <div id="flex-row">
                <div id="flex-col">
                  <label>이메일</label>
                  <input id="id" readOnly value={fakeUser.email} disabled />
                </div>
              </div>
              <div id="flex-row">
                <div id="flex-col">
                  <label>닉네임</label>
                  <input id="id" type="text" name="nickname" value={fakeUser.username} />
                </div>
              </div>
              <div id="flex-row">
                <div id="flex-col">
                  <label>계좌 정보</label>
                  <input id="id" type="number" name="account" value={fakeUser.account} />
                </div>

                <div id="flex-col">
                  <label>은행</label>
                  <select value={fakeUser.bank} id="id">
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
    </div>
  );
};
