import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Filmes from './pages/Filmes';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (tk) => {
    setToken(tk);
    localStorage.setItem('token', tk);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={token ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/filmes" element={token ? <Filmes /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;