import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: 'employer' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Employer', employerSchema);
