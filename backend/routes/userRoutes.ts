import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getProfile, updateProfile } from '../controllers/userController';
import { login, register } from '../controllers/authController';

const router = express.Router();

// User registration and login routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router; 