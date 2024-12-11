// src/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // React Router's navigation hook

  // Hardcoded credentials
  const hardcodedUsername = 'admin';
  const hardcodedPassword = 'password123';

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === hardcodedUsername && password === hardcodedPassword) {
      alert('Login successful!');
      setErrorMessage('');
      navigate('/admin'); // Redirect to /admin
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className="login-page">
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-input-container">
          <label htmlFor="username" className="login-label">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <div className="login-input-container">
          <label htmlFor="password" className="login-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </div>
        {errorMessage && <p className="login-error">{errorMessage}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;
