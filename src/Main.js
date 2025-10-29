import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Main.css';

function Main() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : {};    
    });
    const [input, setInput] = useState('');
    const [goal, setGoal] = useState(() => localStorage.getItem('goal') || '');
    const [goalInput,setGoalInput] = useState('');
    const [showGoalInput, setshowGoalInput] = useState(false);
    const [goalCompleted, setGoalCompleted] = useState(false);
    const formateDate = (date) => {
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().split('T')[0];
    };

    const dateKey = formateDate(selectedDate);
    const currentTodos = todos[dateKey] || [];

    const addTodo = () => {
        if (!input.trim()) return;
        const newTodo = {
            id: Date.now(),
            text: input.trim(),
            completed: false,
        };

        const updateTodos = {
            ...todos,
            [dateKey]: [...currentTodos, newTodo],
        };

        setTodos(updateTodos);
        setInput('');
    };

    const toggleComplete = (id) => {
        const updatedDateTodos = currentTodos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed } : todo 
        );

        const updatedTodos = {
            ...todos,
            [dateKey]: updatedDateTodos,
        };

        setTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        const updatedDateTodos = currentTodos.filter(todo => todo.id !== id);
        const updatedTodos = {
            ...todos,
            [dateKey]: updatedDateTodos,
        };
        setTodos(updatedTodos);
    };

    const countCompletedDays = () => {
        return Object.values(todos).filter(todoList =>
            todoList.length > 0 && todoList.every(todo => todo.completed)
        ).length;
    };

    const saveGoal = () => {
        if (!goalInput.trim()) return;
        setGoal(goalInput.trim());
        setGoalInput("");
        setshowGoalInput(false);
        alert("보상이 저장되었습니다!")
    };


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('goal', goal);

        if (countCompletedDays() >= 30) {
            setGoalCompleted(true);
        }
    }, [todos, goal]);

    

    return (
        <div className="main-container">
            <div className="goal-section">
                <div className="goal-header">
                    <h1>보상</h1>
                    {goal && <span className="star-count">⭐ {countCompletedDays()}</span>}  
                </div>
                
                <div className="goal-display">
                    {goal || "보상을 설정해주세요 !"}
                </div>
                {goalCompleted ? (
                    <button onClick={() => {
                        setGoal('');
                        setGoalCompleted(false);
                         alert("축하합니다 ! 보상을 획득하였습니다 ! \n다시 새로운 보상을 설정하여 목표를 이뤄보세요 !");
                    }}>
                        완료 !
                    </button>
                ) : showGoalInput ? (
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
                ) : (
                    <button onClick={() => setshowGoalInput(true)}>
                        {goal ? "보상 수정하기" : "보상 설정하기"}
                    </button>
                )}

            </div>    
            
            <div className="calendar-section">
                <h1>할 일 목록</h1>

                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileContent={({ date, view}) => {
                        if (view === 'month') {
                            const key = formateDate(date);
                            const dayTodos = todos[key] || [];

                            if (dayTodos.length > 0 && dayTodos.every(todo => todo.completed)) {
                                return <span className="star">⭐</span>
                            }
                        }
                        return null;
                    }}
                />
            </div>

            <div className="todo-section">
                <h2>{dateKey} 일정</h2>
                <div className="todo-input">
                    <input 
                        type="text"
                        placeholder="할 일을 입력하세요"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => {if(e.key === 'Enter') addTodo();}}
                    />
                    <button onClick={addTodo}>
                        추가
                    </button>
                </div>

                <ul className="todo-list">
                    {currentTodos.length === 0 && <li>할 일이 없습니다.</li>}
                    {currentTodos.map(todo => (
                        <li key={todo.id} className="todo-item">
                            <input 
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                            />

                            <span className={todo.completed ? "completed" : ""}>
                                {todo.text}
                            </span>
                            <button onClick={() => deleteTodo(todo.id)}>
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
    
export default Main;


