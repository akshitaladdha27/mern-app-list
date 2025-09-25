const express = require('express');
const router = express.Router();
const { addAgent } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, addAgent);

module.exports = router;