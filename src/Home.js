import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';


function Home() {
    const navigate  = useNavigate();

    return (
        <div className="home-page">
            <div className="home-content">
                <h1 className="home-title">
                    별을 모아 보상을 받아보세요 !
                </h1>
                <p className="home-description">
                    할 일을 입력하고 실천하세요!<br />
                    하루의 일을 모두 완료하면 별을 받습니다 !<br />
                    별 50개를 모으고 자신이 직접 선정한 보상을 받아보세요 !!
                </p>
            </div>
            <div className="home-button">
                <button 
                    className="main-button"
                    onClick={() => navigate("/login")}>
                        로그인하기
                </button>
                <button 
                    className="main-button"
                    onClick={() => navigate("/signup")}>
                        가입하기
                </button> 

                <button 
                    className="main-button"
                    onClick={() => navigate("/main")}>
                        시작하기
                </button> 

        
            </div> 
        </div>
    )
}

export default Home;
