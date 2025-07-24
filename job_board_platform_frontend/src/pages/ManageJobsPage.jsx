import { useEffect, useState } from 'react';
import API from '../services/api.js';
import JobForm from '../components/JobForm.jsx';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const fetchEmployerJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/jobs/jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/jobs/delete-job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
    setIsPosting(false);
  };

  const handleCreate = () => {
    setEditingJob(null);
    setShowForm(true);
    setIsPosting(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingJob(null);
    setIsPosting(false);
  };

  const handleFormSuccess = (newJob, isUpdate = false) => {
    if (isUpdate) {
      setJobs(jobs.map(job => job._id === newJob._id ? newJob : job));
    } else {
      setJobs([newJob, ...jobs]);
    }
    handleFormClose();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">Manage My Jobs</h2>
          <button
            onClick={handleCreate}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md shadow-md transition"
          >
            + Post Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <p className="text-gray-300 text-center">You haven't posted any jobs yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map(job => (
              <div
                key={job._id}
                className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border border-blue-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-semibold text-white mb-2">{job.title}</h3>
                <p className="text-gray-300"><span className="font-semibold">Description:</span> {job.description}</p>
                <p className="text-gray-300"><span className="font-semibold">Location:</span> {job.location}</p>
                <p className="text-gray-300"><span className="font-semibold">Type:</span> {job.type}</p>
                <p className="text-gray-300"><span className="font-semibold">Salary:</span> {job.salaryRange}</p>

                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleEdit(job)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded shadow-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded shadow-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="mt-10">
            <JobForm
              initialData={editingJob}
              onClose={handleFormClose}
              onSuccess={handleFormSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
}
