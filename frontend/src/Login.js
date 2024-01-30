import React, { useState } from "react";


function Login() {

  const [inputs, setInputs] = useState({
    userId: "",
    userPw: "",
  });


  const { userId, userPw } = inputs;


  return (
    <>
      <div id='login'>
        <div id='welcome'> 
          <strong> 어서오세요!</strong>
          공유 배달 시스템 '이화 공유배달'에 오신 것을 환영합니다.
        </div>
        <div id='login-register'>
        <form id='id-pw'>
          <p>이메일</p>
          <input id='id'
            type="text"
            name="userID"
            placeholder="@ewhain.net"
            value={userId}
          />
          <p>비밀번호</p>
          <input id='pw'
            type="password"
            name="userPw"
            placeholder="비밀번호"
            value={userPw}
          />
          <button type="submit" id='login-button'>로그인</button>
        </form>
        
          <a href="./register" id='register-button'>
            <span>아직 계정이 없으신가요?</span> <div id='green'>회원가입</div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;