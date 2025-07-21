import express from 'express';
import {postJob, getJobs, updateJobs, deleteJob} from '../controllers/job.controller.js';
import { protect, isEmployer } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/job-post',protect, isEmployer, postJob);
router.get('/jobs', getJobs);
router.put('/update-job/:jobId', protect, isEmployer, updateJobs);
router.delete('/delete-job/:jobId', protect, isEmployer, deleteJob);

export default router;