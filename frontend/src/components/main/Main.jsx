import { Header } from '../header';
import { Posts } from '../posts';
import { useState, useEffect } from 'react';

export function Main() {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  useEffect(() => {
    const isRegistered = sessionStorage.getItem('IsRegistered');
    if (isRegistered) {
      setIsSnackbarOpen(true); // 회원가입 성공 시 스낵바 열기

      setTimeout(() => {
        setIsSnackbarOpen(false); // 일정 시간 후 스낵바 닫기
      }, 3000); // 3초 후에 자동으로 닫힘
    }
  }, []);
  return (
    <>
      <Header />
      <Posts />
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
}
