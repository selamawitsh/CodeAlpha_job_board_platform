import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  JobSeeker: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker', required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Resume', resumeSchema);
