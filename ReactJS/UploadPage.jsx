// src/UploadPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './UploadPage.css';

const UploadPage = () => {
  const [file, setFile] = useState(null); // State to hold the selected file
  const [message, setMessage] = useState(''); // State to display feedback

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Get the selected file
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('formsub', file); // Add the file to FormData, backend pe 'formsub' key use ki hai isliye file ki jagha

    try {
      // Replace the URL with your actual API endpoint
      const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set header for file upload
        },
      });

      if (response.status === 200) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage('Failed to upload the file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('An error occurred during file upload.');
    }
  };

  return (
    <div className="upload-page-container">
      <h1>Upload Your 3D Design</h1>
      <input 
        type="file" 
        accept=".stl,.obj,.zip,.pdf,.CATPart" //jo file ka extention doge vo hi upload kar paoge
        onChange={handleFileChange} 
      />
      <button 
        style={{ marginTop: '20px' }} 
        onClick={handleUpload}
      >
        Submit
      </button>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>} {/* Display feedback */}
    </div>
  );
};

export default UploadPage;
