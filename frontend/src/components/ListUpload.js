import React, { useState } from 'react';
import axios from 'axios';

const ListUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token,
        },
      };

      const res = await axios.post('/api/lists/upload', formData, config);
      setMessage(res.data.message);
      onUploadSuccess(); 
    } catch (err) {
      setError(err.response?.data?.message || 'File upload failed');
    }
  };

  return (
    <div style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '8px', marginTop: '2rem' }}>
      <h3>Upload and Distribute List</h3>
      <form onSubmit={onSubmit}>
        <input 
          type="file" 
          onChange={onFileChange} 
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
        />
        <button type="submit" style={{ padding: '10px 15px', marginLeft: '10px' }}>Upload</button>
      </form>
      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default ListUpload;