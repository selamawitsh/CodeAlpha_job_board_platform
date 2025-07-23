import { useEffect, useState } from 'react';
import API from '../services/api';

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); // ID of app being updated

  const token = localStorage.getItem('token');

  // Fetch applications submitted to the employer's jobs
  const fetchApplications = async () => {
    try {
      const res = await API.get('/applications/employer-applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Update application status
  const updateStatus = async (applicationId, newStatus) => {
    setUpdatingId(applicationId);
    try {
      const res = await API.put(
        `/applications/update-status/${applicationId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Replace updated application in state
      setApplications(apps =>
        apps.map(app =>
          app._id === applicationId ? res.data : app
        )
      );
    } catch (error) {
      alert('Failed to update application status');
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Loading applications...</p>;

  return (
    <div>
      <h2>Applications for Your Jobs</h2>
      {applications.length === 0 && <p>No applications received yet.</p>}
      {applications.map(app => (
        <div key={app._id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px' }}>
          <h3>Job: {app.job?.title || 'Untitled Job'}</h3>
          <p><strong>Applicant:</strong> {app.JobSeeker?.name || 'Unknown'}</p>
          <p><strong>Current Status:</strong> {app.status}</p>

          <label>
            Update Status:
            <select
              value={app.status}
              onChange={(e) => updateStatus(app._id, e.target.value)}
              disabled={updatingId === app._id}
            >
              <option value="Applied">Applied</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected'">Rejected'</option>
              <option value="Hired">Hired</option>
            </select>
          </label>
        </div>
      ))}
    </div>
  );
};

export default EmployerApplications;
