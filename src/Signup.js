import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css'

function SignUp() {
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");

    const navigate  = useNavigate();
    
    const handleSignUp = () => {
        if (password.length !== 4) {
            alert("비밀번호는 4자리여야 합니다.");
            return;
        }

        if (!/^\d{4}$/.test(password)) {
            alert("비밀번호는 숫자 4자리여야 합니다.");
            return;
        }

        const userData = {
            name,
            password,
        };

        localStorage.setItem("사용자_" + name, JSON.stringify(userData));
        alert("회원가입이 완료되었습니다 !");
        navigate("/");
        
    };

    return (
    <div className="signup-page">
        <div className="signup-title">
            회원가입
        </div>

        <div className="signup-content">
            <div className="signup-subtitle">
                이름
            </div>
            <div className="signup-input">
                <input 
                className="input"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}>
                </input>
            </div>
        
            <div className="signup-subtitle">
                비밀번호
            </div>
            <div className="signup-input">
                <input 
                type="password"
                className="input"
                placeholder="4자리 숫자를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
                </input>
            </div>
        </div>

        <div>
            <button 
            className="signup-button"
            onClick={handleSignUp}>
                회원가입
            </button>
        </div>

    </div>
  );
}

export default SignUp;