import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Savegoal.css"


function Savegoal({countCompletedDays}) {
    const [goal, setGoal] = useState(() => {
            return localStorage.getItem("goal") || "";
        });
    const [goalInput, setGoalInput] = useState("");
    const navigate = useNavigate();
        
    const saveGoal = () => {
        if (!goalInput.trim()) return;
        setGoal(goalInput.trim());
        localStorage.setItem("goal", goalInput.trim());
        setGoalInput("");
        alert("보상이 저장되었습니다!")
    };
    
    return (
        <div className="goal-section">
                <h2>보상</h2>
                
                <div className="goal-display">
                    {goal ? goal : "아직 설정된 보상이 없습니다."}
                </div>

                <div className="goal-input-group">
                    <input
                        type="text"
                        placeholder="원하는 보상을 입력하세요"
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") saveGoal();
                        }}
                    />
                    <button onClick={saveGoal}>설정</button>
                </div>

                <button className="back-button" onClick={() => navigate("/main")}>
                    메인화면으로 돌아가기 
                </button>
            </div>
    );

}

export default Savegoal;