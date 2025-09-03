import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';


function Login({onLoginSuccess}) {
    const [name, setName]=useState("");
    const [password, setPassword]=useState("");

    const navigate  = useNavigate();

    const handleLogin = () => {
        const storedUser = localStorage.getItem("사용자_" + name);

        if (!storedUser) {
            alert("등록되지 않은 사용자입니다.");
            return;
        }

        const user = JSON.parse(storedUser);

        if (user.password === password) {
            alert("로그인 성공")
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            onLoginSuccess(user);
            navigate("/main")
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    };


  return (
    <div className="login-page">
        <div className="login-title">
            이름과 비밀번호를 입력하세요.
        </div>

        <div className="login-content">
            <div className="login-subtitle">
                이름
            </div>
            <div className="login-input">
                <input 
                className="input"
                placeholder="ex) 홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}>
                </input>
            </div>
        
            <div className="login-subtitle">
                비밀번호
            </div>
            <div className="login-input">
                <input 
                type="password"
                className="input"
                placeholder="4자리 숫자"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
                </input>
            </div>
        </div>


        <div>
            <button 
            className="login-button"
            onClick={handleLogin}>
                확인
            </button>
        </div>

    </div>
  );
}

export default Login;
