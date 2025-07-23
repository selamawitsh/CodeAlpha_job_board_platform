import ApplicationModel from "../models/Application.model.js";
import JobModel from "../models/Job.model.js"

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

    const application = await ApplicationModel.findById(applicationId).populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.job.postedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    res.status(200).json(application);
  } catch (error) {
    console.error('Error in updateApplicationStatus:', error); // <--- Add this
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

const getApplicationsForEmployer = async (req, res) => {
  try {
    const employerId = req.user.userId;

    // Step 1: Find all jobs posted by this employer
    const employerJobs = await JobModel.find({ postedBy: employerId }).select('_id');

    const jobIds = employerJobs.map(job => job._id);

    // Step 2: Find all applications for those jobs
    const applications = await ApplicationModel.find({ job: { $in: jobIds } })
      .populate('job', 'title location type') // Populate only necessary job fields
      .populate('JobSeeker', 'fullName email') // Populate job seeker fields
      .exec();

    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching employer applications:', error);
    res.status(500).json({
      message: 'Error fetching employer applications',
      error: error.message,
    });
  }
};


export { applyForJob, getApplications, updateApplicationStatus, deleteApplication, getApplicationsForEmployer };