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
      setIsSnackbarOpen(true);

      setTimeout(() => {
        setIsSnackbarOpen(false);
      }, 5000);
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
