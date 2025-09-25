const Agent = require('../models/Agent');

// @desc    Add a new agent
// @route   POST /api/agents
// @access  Private (Admin only)
const addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const agentExists = await Agent.findOne({ email });

    if (agentExists) {
      return res.status(400).json({ message: 'Agent with this email already exists' });
    }

    const agent = await Agent.create({
      name,
      email,
      mobile,
      password,
    });

    if (agent) {
      res.status(201).json({
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
      });
    } else {
      res.status(400).json({ message: 'Invalid agent data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addAgent };