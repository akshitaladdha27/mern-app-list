import React, { useState, useEffect, useCallback  } from 'react';
import axios from 'axios';
import AddAgentForm from '../components/AddAgentForm';
import ListUpload from '../components/ListUpload'; 
import DistributedLists from '../components/DistributedLists'; 

const AdminDashboard = () => {
  const [listItems, setListItems] = useState([]);

  const distributeItems = (items, agents = ["Agent 1", "Agent 2", "Agent 3", "Agent 4", "Agent 5"]) => {
  return items.map((item, index) => {
    const agentIndex = index % agents.length;
    return {
      ...item,
      assignedTo: { name: agents[agentIndex] },
    };
  });
};

  const fetchLists = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'Authorization': token } };
      const res = await axios.get('/api/lists', config);
      const distributed = distributeItems(res.data);
    setListItems(distributed);
    } catch (error) {
      console.error('Failed to fetch lists', error);
    }
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome Admin</h1>
      <AddAgentForm />
      <ListUpload onUploadSuccess={fetchLists} />
      <DistributedLists items={listItems} />
    </div>
  );
};

export default AdminDashboard;