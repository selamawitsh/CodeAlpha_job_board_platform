import express from 'express';
import { applyForJob, getApplications, updateApplicationStatus, deleteApplication } from '../controllers/application.controller.js';
import { protect, isEmployer } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/apply/:jobId', protect, applyForJob);
router.get('/my-applications', protect, getApplications);
router.put('/update-status/:applicationId', protect, isEmployer, updateApplicationStatus);
router.delete('/delete/:applicationId', protect, deleteApplication);

export default router;
