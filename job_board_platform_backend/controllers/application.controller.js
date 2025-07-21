import ApplicationModel from "../models/Application.model.js";

const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const jobSeekerId = req.user.userId;

        const existing = await ApplicationModel.findOne({
            JobSeeker: jobSeekerId,
            job: jobId,
        });

        if (existing) {
        return res.status(400).send({
            success: false,
            message: 'You have already applied to this job',
        });
        }

        const newApplication = new ApplicationModel({
            JobSeeker: jobSeekerId,
            job: jobId
        });

        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(500).json({ message: 'Error applying for job', error: error.message });
    }
};

const getApplications = async (req, res) => {
    try {
        const jobSeekerId = req.user.userId;

        const applications = await ApplicationModel.find({ JobSeeker: jobSeekerId })
            .populate('job', 'title companyName')
            .exec();

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error: error.message });
    }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Find application and populate the job field
    const application = await ApplicationModel.findById(applicationId).populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the employer updating the application owns the job
    if (application.job.postedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    // Update the application status
    application.status = status;
    await application.save();

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error: error.message });
  }
};
const deleteApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const deletedApplication = await ApplicationModel.findByIdAndDelete(applicationId);

        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting application', error: error.message });
    }
};

export { applyForJob, getApplications, updateApplicationStatus, deleteApplication };