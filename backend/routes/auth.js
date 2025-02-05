const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);

// User Profile Routes
router.get('/me', userController.getMe);
router.put('/update', userController.updateUser);

module.exports = router;
