import React, { useState } from 'react';
import axios from 'axios';

const AddAgentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { name, email, mobile, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, 
      },
    };

    try {
      const res = await axios.post('/api/agents', formData, config);
      setMessage(`Agent "${res.data.name}" created successfully!`);
      setFormData({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create agent');
    }
  };

  return (
    <div
      style={{
        padding: '2rem',
        border: '1px solid #eee',
        borderRadius: '8px',
        marginTop: '2rem',
        textAlign: 'center',
      }}
    >
      <h3>Add New Agent</h3>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          gap: '10px',
          marginTop: '1rem',
        }}
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          required
          style={{
            padding: '8px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
          style={{
            padding: '8px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          placeholder="Mobile Number (+1234567890)"
          name="mobile"
          value={mobile}
          onChange={onChange}
          required
          style={{
            padding: '8px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
          style={{
            padding: '8px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: '#555556ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Agent
        </button>
      </form>
      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default AddAgentForm;