import JobModel from '../models/job.model.js';


const postJob = async (req, res) => {
    try {
        const { title, description, location, type, salaryRange } = req.body;
        const employerId = req.user.userId; 
         const newJob = new JobModel({
            title,
            description,
            location,
            type,
            salaryRange,
            postedBy: employerId
        });
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);

       
    } catch (error) {
        res.status(500).json({ message: 'Error posting job', error: error.message });
    }
}

const getJobs = async (req, res)=>{
    try {
        const {title, location, type} = req.query;
        const query = {};
        if (title){
            query.title = { $regex: title, $options: 'i' }; 
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (type) {
            query.type = type;
        }

        const jobs = await JobModel.find(query).populate('postedBy', 'companyName email');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
};

const updateJobs = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { title, description, location, type, salaryRange } = req.body;

        const updatedJob = await JobModel.findByIdAndUpdate(
            jobId,
            { title, description, location, type, salaryRange },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: 'Error updating job', error: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const deletedJob = await JobModel.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job', error: error.message });
    }
};  


export {postJob, getJobs, updateJobs, deleteJob};