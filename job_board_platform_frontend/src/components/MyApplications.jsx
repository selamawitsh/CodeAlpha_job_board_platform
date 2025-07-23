import React from 'react';

const MyApplications = ({ applications, onWithdraw }) => {
  return (
    <div>
      <h2>My Applications</h2>
      {applications.length === 0 && <p>You have not applied to any jobs yet.</p>}
      {applications.map(app => (
        <div key={app._id}>
          <h3>{app.job.title}</h3>
          <p><strong>Company:</strong> {app.job.companyName || 'N/A'}</p>
          <p><strong>Status:</strong> {app.status}</p>
          <button onClick={() => onWithdraw(app._id)}>
            Withdraw Application
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;
