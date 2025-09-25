const csv = require('csv-parser');
const streamifier = require('streamifier');
const ListItem = require('../models/ListItem');
const Agent = require('../models/Agent');

// @desc    Upload a CSV and distribute items
// @route   POST /api/lists/upload
// @access  Private (Admin only)
const uploadList = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  const results = [];
  const listName = req.file.originalname;

  streamifier.createReadStream(req.file.buffer)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        if (results.length > 0) {
          const headers = Object.keys(results[0]);
          if (!headers.includes('FirstName') || !headers.includes('Phone') || !headers.includes('Notes')) {
            return res.status(400).json({ message: 'Invalid CSV format. Required headers: FirstName, Phone, Notes' });
          }
        } else {
           return res.status(400).json({ message: 'CSV file is empty.' });
        }
        
        const agents = await Agent.find({});
        if (agents.length === 0) {
          return res.status(400).json({ message: 'No agents available to distribute tasks.' });
        }

        let agentIndex = 0;
        const listItemsToSave = results.map(row => {
          const assignedAgent = agents[agentIndex];
          agentIndex = (agentIndex + 1) % agents.length; 

          return {
            firstName: row.FirstName,
            phone: row.Phone,
            notes: row.Notes,
            listName: listName,
            assignedTo: assignedAgent._id,
          };
        });
        
        await ListItem.insertMany(listItemsToSave);

        res.status(200).json({
          message: `${results.length} items successfully uploaded and distributed among ${agents.length} agents.`
        });

      } catch (error) {
        res.status(500).json({ message: 'Server error during distribution', error: error.message });
      }
    });
};

const getLists = async (req, res) => {
  try {
    const items = await ListItem.find({}).populate('assignedTo', 'name email');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  uploadList,
  getLists,
};