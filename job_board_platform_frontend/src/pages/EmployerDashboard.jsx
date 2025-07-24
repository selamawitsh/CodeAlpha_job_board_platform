import { useState } from 'react';
import ManageJobs from './ManageJobsPage.jsx';
import EmployerApplications from './EmployerApplications.jsx';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <nav className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition 
              ${activeTab === 'jobs'
                ? 'bg-blue-700 text-white shadow-lg'
                : 'bg-blue-900 hover:bg-blue-800 text-gray-300'}`}
          >
            Manage Jobs
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition 
              ${activeTab === 'applications'
                ? 'bg-blue-700 text-white shadow-lg'
                : 'bg-blue-900 hover:bg-blue-800 text-gray-300'}`}
          >
            Review Applications
          </button>
        </nav>

        <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-2xl p-6">
          {activeTab === 'jobs' && <ManageJobs />}
          {activeTab === 'applications' && <EmployerApplications />}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
