import express from 'express';
import { uploadResume } from '../controllers/resume.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/upload', protect, upload.single('resume'), uploadResume);

export default router;
