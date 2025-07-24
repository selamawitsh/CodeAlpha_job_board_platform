import { useEffect, useState } from 'react';
import API from '../services/api';

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchApplications = async () => {
    try {
      const res = await API.get('/applications/employer-applications', {
        headers: { Authorization: `Bearer ${token}` },
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

  const updateStatus = async (applicationId, newStatus) => {
    setUpdatingId(applicationId);
    try {
      const res = await API.put(
        `/applications/update-status/${applicationId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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

  if (loading) {
    return (
      <div className="text-center text-white py-10">
        <p className="text-lg">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Applications for Your Jobs</h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-300">No applications received yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map(app => (
            <div
              key={app._id}
              className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border border-blue-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Job: {app.job?.title || 'Untitled Job'}
              </h3>
              <p className="text-gray-300">
                <span className="font-semibold">Applicant:</span> {app.JobSeeker?.fullName || 'Unknown'}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Email:</span> {app.JobSeeker?.email || 'Unknown'}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Current Status:</span> {app.status}
              </p>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Update Status:
                </label>
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(app._id, e.target.value)}
                  disabled={updatingId === app._id}
                  className="w-full p-2 rounded-md bg-gray-900 border border-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Applied">Applied</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerApplications;
