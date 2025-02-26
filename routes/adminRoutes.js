const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const authenticateToken = require('../middleWares/authMiddleware');

// Register admin
router.post('/register', AdminController.register);

// Login admin
router.post('/login', AdminController.login);

// A protected route that requires token
router.get('/dashboard', authenticateToken, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the admin dashboard',
    adminId: req.adminId
  });
});

module.exports = router;
