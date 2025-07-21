import mongoose from 'mongoose';

const JobSeekerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  resume: { type: String }, // file path or URL
  role: { type: String, default: 'JobSeeker' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('JobSeeker', JobSeekerSchema);
