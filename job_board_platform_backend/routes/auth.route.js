import express from 'express';
import {registerEmployer, registerJobSeeker, loginUser, getallUsers} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register-employer', registerEmployer);
router.post('/register-job-seeker', registerJobSeeker);
router.post('/login', loginUser);
router.get('/users', getallUsers);

export default router;