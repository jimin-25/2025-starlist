import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home.js';
import SignUp from './Signup.js';
import Login from './Login.js';
import Main from "./Main.js";

function App() { 
    const [CurrentUser, setCurrentUser] = useState(null);

    const handleLoginSuccess =(user) => {
        setCurrentUser(user);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="/main" element={<Main />} />
                <Route 
                    path="/login"
                    element={
                        <Login onLoginSuccess={handleLoginSuccess} />
                    } />
            </Routes>
        </Router>
    )

}

export default App;
