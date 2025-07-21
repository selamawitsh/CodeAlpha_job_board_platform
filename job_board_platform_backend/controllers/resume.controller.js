import Resume from '../models/Resume.model.js';

export const uploadResume = async (req, res) => {
  try {
    const jobSeekerId = req.user.userId;
    const fileUrl = `/uploads/resumes/${req.file.filename}`;

    const resume = new Resume({
      JobSeeker: jobSeekerId,
      fileUrl
    });

    await resume.save();

    res.status(201).send({
      success: true,
      message: 'Resume uploaded successfully',
      resume
    });
  } catch (error) {
    console.error('Resume Upload Error:', error);
    res.status(500).send({
      success: false,
      message: 'Resume upload failed',
      error: error.message
    });
  }
};
