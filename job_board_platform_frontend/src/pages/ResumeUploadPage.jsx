import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const ResumeUploadPage = () => {
  const { jobId } = useParams();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const navigate = useNavigate();

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
      await API.post('/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      await API.post(`/applications/apply/${jobId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert('Resume uploaded and application submitted!');
      navigate('/jobs');
    } catch (err) {
      console.error('Upload or application error:', err);
      alert('Failed to upload resume or apply.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-2xl text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Upload Resume for: <span className="text-blue-400">{jobTitle || 'Loading...'}</span>
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Resume File</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full p-3 rounded-md bg-gray-900 border border-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded shadow-md transition duration-200"
        >
          Upload Resume & Apply
        </button>
      </div>
    </div>
  );
};

export default ResumeUploadPage;
