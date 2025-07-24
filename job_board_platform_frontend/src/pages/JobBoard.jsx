import { useState, useEffect } from 'react';
import API from '../services/api';
import AllJobList from '../components/AllJobList.jsx';
import MyApplications from '../components/MyApplications.jsx';

const JobBoard = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [myApplications, setMyApplications] = useState([]);

  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs/jobs');
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await API.get('/applications/my-applications', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobIds = res.data
        .filter(app => app.job)
        .map(app => app.job._id);

      setAppliedJobs(jobIds);
      setMyApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const applyForJob = async (jobId) => {
    try {
      await API.post(`/applications/apply/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Successfully applied.');
      setAppliedJobs(prev => [...prev, jobId]);
      fetchAppliedJobs();
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to apply.');
    }
  };

  const withdrawApplication = async (applicationId) => {
    try {
      await API.delete(`/applications/delete/${applicationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Application withdrawn.');
      fetchAppliedJobs();
    } catch (error) {
      alert('Failed to withdraw application.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-5 py-2 rounded-full font-semibold transition 
              ${activeTab === 'jobs'
                ? 'bg-blue-700 text-white shadow-lg'
                : 'bg-blue-900 hover:bg-blue-800 text-gray-200'}`}
          >
            All Jobs Available
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-5 py-2 rounded-full font-semibold transition 
              ${activeTab === 'applications'
                ? 'bg-blue-700 text-white shadow-lg'
                : 'bg-blue-900 hover:bg-blue-800 text-gray-200'}`}
          >
            My Applications
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-2xl">
          {activeTab === 'jobs' ? (
            <AllJobList
              jobs={jobs}
              appliedJobs={appliedJobs}
              onApply={applyForJob}
            />
          ) : (
            <MyApplications
              applications={myApplications}
              onWithdraw={withdrawApplication}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
