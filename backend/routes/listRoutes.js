const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadList, getLists } = require('../controllers/listController'); // Fixed: Added getLists
const { protect } = require('../middleware/authMiddleware');

const storage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only CSV, XLSX, and XLS are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/upload', protect, upload.single('csvFile'), uploadList);
router.get('/', protect, getLists);

module.exports = router;