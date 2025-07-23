import { useNavigate } from 'react-router-dom';

const AllJobList = ({ jobs, appliedJobs }) => {
  const navigate = useNavigate();

  const handleApplyClick = (jobId) => {
    navigate(`/upload-resume/${jobId}`);
  };

  return (
    <div>
      <h2>Available Job Listings</h2>
      {jobs.length === 0 && <p>No jobs available.</p>}
      {jobs.map(job => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Type:</strong> {job.type}</p>
          <p><strong>Salary:</strong> {job.salaryRange}</p>
          <p><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
          <button
            onClick={() => handleApplyClick(job._id)}
            disabled={appliedJobs.includes(job._id)}
          >
            {appliedJobs.includes(job._id) ? 'Applied' : 'Apply'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllJobList;
