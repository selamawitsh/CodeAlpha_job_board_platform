import { useNavigate } from 'react-router-dom';

const AllJobList = ({ jobs, appliedJobs }) => {
  const navigate = useNavigate();

  const handleApplyClick = (jobId) => {
    navigate(`/upload-resume/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 py-10 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-10">
          Available Job Listings
        </h2>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-300">No jobs available at the moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map(job => (
              <div
                key={job._id}
                className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 p-6 rounded-lg shadow-lg border border-blue-700 transition hover:shadow-xl"
              >
                <h3 className="text-2xl font-semibold text-white mb-2">{job.title}</h3>
                <p className="text-gray-300"><span className="font-semibold">Description:</span> {job.description}</p>
                <p className="text-gray-300"><span className="font-semibold">Location:</span> {job.location}</p>
                <p className="text-gray-300"><span className="font-semibold">Type:</span> {job.type}</p>
                <p className="text-gray-300"><span className="font-semibold">Salary:</span> {job.salaryRange}</p>
                <p className="text-gray-400 text-sm"><span className="font-semibold">Posted:</span> {new Date(job.createdAt).toLocaleDateString()}</p>

                <button
                  onClick={() => handleApplyClick(job._id)}
                  disabled={appliedJobs.includes(job._id)}
                  className={`mt-4 w-full py-2 px-4 rounded-md font-semibold transition 
                    ${appliedJobs.includes(job._id)
                      ? 'bg-gray-600 cursor-not-allowed text-white'
                      : 'bg-blue-700 hover:bg-blue-800 text-white shadow-md'}`}
                >
                  {appliedJobs.includes(job._id) ? 'Applied' : 'Apply'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobList;
