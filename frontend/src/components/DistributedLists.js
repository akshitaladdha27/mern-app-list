import React from 'react';

const DistributedLists = ({ items }) => {
  const groupedByAgent = items.reduce((acc, item) => {
    const agentName = item.assignedTo ? item.assignedTo.name : 'Unassigned';
    
    if (!acc[agentName]) {
      acc[agentName] = [];
    }
    
    acc[agentName].push(item);
    return acc;
  }, {});

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Distributed Lists</h2>
      {Object.keys(groupedByAgent).length === 0 ? (
        <p>No lists have been distributed yet.</p>
      ) : (
        Object.entries(groupedByAgent).map(([agentName, agentItems]) => (
          <div key={agentName} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>Agent: {agentName} ({agentItems.length} items)</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                  <th style={{ padding: '8px' }}>First Name</th>
                  <th style={{ padding: '8px' }}>Phone</th>
                  <th style={{ padding: '8px' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {agentItems.map(item => (
                  <tr key={item._id}>
                    <td style={{ padding: '8px' }}>{item.firstName}</td>
                    <td style={{ padding: '8px' }}>{item.phone}</td>
                    <td style={{ padding: '8px' }}>{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default DistributedLists;