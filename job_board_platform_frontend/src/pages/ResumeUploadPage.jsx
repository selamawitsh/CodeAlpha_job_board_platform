import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const ResumeUploadPage = () => {
  const { jobId } = useParams();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const navigate = useNavigate();

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await API.get(`/jobs/jobs/${jobId}`);
        setJobTitle(res.data.title || 'Job');
      } catch (err) {
        console.error('Error fetching job:', err);
        setJobTitle('Unknown Job');
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!resumeFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobId', jobId);

    try {
      // Upload resume
      await API.post('/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Apply for the job
      await API.post(`/applications/apply/${jobId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Resume uploaded and application submitted!');
      navigate('/jobs');
    } catch (err) {
      console.error('Upload or application error:', err);
      alert('Failed to upload resume or apply.');
    }
  };

  return (
    <div>
      <h2>Upload Resume for: {jobTitle || 'Loading...'}</h2>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Resume</button>
    </div>
  );
};

export default ResumeUploadPage;
