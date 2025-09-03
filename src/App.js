import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Home from './Home.js';
import SignUp from './Signup.js';
import Login from './Login.js';
import Main from "./Main.js";

function App() { 
  const [currentUser, setcurrentUser] = useState(null); 
  
  useEffect(() => { 
    const saveuser= JSON.parse(localStorage.getItem("loggedInUser")); 
    
    if (saveuser) { 
      setcurrentUser(saveuser); 
    } 
  }, []); 
  
  return ( 
  <Router> 
    <Routes> 
      <Route path="/" element={<Home />} /> 
      <Route path="/signup" element={<SignUp />} /> 
      <Route 
        path="/login" 
        element={ 
          <Login onLoginSuccess={(user) => setcurrentUser(user)} /> 
        } /> 
      <Route 
        path="/main" 
        element={ currentUser ? ( <
          Main user={currentUser} /> 
        ) : ( 
          <Navigate to="/" /> 
        ) 
      }/> 
      </Routes> 
    </Router> 
  );
}

export default App;
