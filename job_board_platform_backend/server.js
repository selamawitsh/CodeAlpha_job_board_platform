import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import jobRoutes from './routes/job.route.js';
import applicationRoutes from './routes/application.routes.js';
import resumeRoutes from './routes/resume.route.js';

dotenv.config();
const PORT = process.env.PORT || 4000
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/uploads', express.static('uploads'));


app.listen(PORT, ()=>{
    console.log(`the server is running on http://localhost:${PORT}`);
})