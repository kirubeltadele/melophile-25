import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getProfile, updateProfile } from '../controllers/userController';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router; 