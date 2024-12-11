// src/HomePage.jsx
import React from 'react';
import './HomePage.css'; // Ensure you import the CSS file for styling

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="title">Welcome to 3D Print Service!</h1>
      <p className="description">Your one-stop solution for 3D printing. Upload, Print, Deliver!</p>
      <button className="get-started-btn" onClick={() => window.location.href = '/upload'}>
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
