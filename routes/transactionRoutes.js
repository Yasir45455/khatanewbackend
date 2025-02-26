const express = require('express');
const multer = require('multer');
const { createTransaction, getAllTransactions, getTransactionById, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const authenticateAdmin = require('../middleWares/authMiddleware');
const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('screenshot'),authenticateAdmin, createTransaction);
router.get('/',authenticateAdmin, getAllTransactions);
router.get('/:id',authenticateAdmin, getTransactionById);
router.put('/:id',authenticateAdmin, upload.single('screenshot'), updateTransaction);
router.delete('/:id',authenticateAdmin, deleteTransaction);

module.exports = router;
