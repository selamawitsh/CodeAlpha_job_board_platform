import { useState } from 'react';
import ManageJobs from './ManageJobsPage.jsx';
import EmployerApplications from './EmployerApplications.jsx';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('jobs')}>Manage Jobs</button>
        <button onClick={() => setActiveTab('applications')}>Review Applications</button>
      </nav>

      {activeTab === 'jobs' && <ManageJobs />}
      {activeTab === 'applications' && <EmployerApplications />}
    </div>
  );
};

export default EmployerDashboard;
