import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import UploadPage from './UploadPage';  // Ensure this component is created
import Navbar from './Navbar';
import About from './About.jsx';
import Services from './Services.jsx';
import AdminLogin from './AdminLogin.jsx';
import Admin from './Admin.jsx';
import Contact from './Contact.jsx';


function App() {
  return (
    <>
      <Navbar /> {/* Navbar stays outside Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/contact" element={<Contact/>} />

      </Routes>
    </>
  );
}

export default App;
