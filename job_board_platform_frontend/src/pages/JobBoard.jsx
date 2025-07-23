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
        headers: { Authorization: `Bearer ${token}` }
      });
      const jobIds = res.data.map(app => app.job._id);
      setAppliedJobs(jobIds);
      setMyApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const applyForJob = async (jobId) => {
    try {
      await API.post(`/applications/apply/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
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
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('jobs')}>All Jobs Available</button>
        <button onClick={() => setActiveTab('applications')}>My Applications</button>
      </div>

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
  );
};

export default JobBoard;
