import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  JobSeeker: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['Applied', 'Reviewed', 'Interviewing', 'Rejected', 'Hired'], default: 'Applied' },
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', applicationSchema);

