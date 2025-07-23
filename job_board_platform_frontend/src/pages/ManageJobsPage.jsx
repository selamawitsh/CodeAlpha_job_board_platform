import { useEffect, useState } from 'react';
import API from '../services/api.js';
import JobForm from '../components/JobForm.jsx';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [isPosting, setIsPosting] = useState(false);


  // Fetch employer's jobs
  const fetchEmployerJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/jobs/jobs', {
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
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

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h2>Manage My Jobs</h2>

      <button onClick={handleCreate} title="Add New Job">
        + Post Job
      </button>

      {jobs.length === 0 ? (
        <p>You haven't posted any jobs yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Salary:</strong> {job.salaryRange}</p>

            <button onClick={() => handleEdit(job)}>Edit</button>
            <button onClick={() => handleDelete(job._id)}>Delete</button>
          </div>
        ))
      )}

      {showForm && (
        <JobForm
          initialData={editingJob}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
