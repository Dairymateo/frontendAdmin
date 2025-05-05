
import './App.css';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      
      </div>
    </Router>

  );
}

export default App;
