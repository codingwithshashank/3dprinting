import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

export default function Admin() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch files from the backend
    axios
      .get('http://localhost:8080/api/files')
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
      });
  }, []);

  // Handle file download
  const handleDownload = (fileId, fileName) => {
    axios
      .get(`http://localhost:8080/api/files/download/${fileId}`, {
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // File name for the downloaded file
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
        alert('Failed to download file. Please try again.');
      });
  };

  // Handle file delete
  const handleDelete = (fileId) => {
    axios
      .delete(`http://localhost:8080/api/files/delete/${fileId}`)
      .then((response) => {
        alert('File deleted successfully');
        setFiles(files.filter((file) => file.id !== fileId));
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
        alert('Failed to delete file. Please try again.');
      });
  };

  return (
    <section className="admin-page">
        <div className="admin-header">
      <h1 className="admin-title">Admin Dashboard</h1>
      </div>
      <div className="file-list">
        {files.map((file) => (
          <div key={file.id} className="file-item">
            <span className="file-name">{file.file_name}</span>
            <div className="file-actions">
              <button
                className="download-btn"
                onClick={() => handleDownload(file.id, file.file_name)}
              >
                Download
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(file.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
