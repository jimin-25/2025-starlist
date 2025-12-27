import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home.js';
import Main from "./Main.js";

function App() { 
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </Router>
    )

}

export default App;
