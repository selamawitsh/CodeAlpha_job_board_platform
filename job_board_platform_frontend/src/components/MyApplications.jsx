import React from 'react';

const MyApplications = ({ applications, onWithdraw }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 py-10 px-4 text-white">
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">My Applications</h2>

        {applications.length === 0 ? (
          <p className="text-center text-gray-300">You have not applied to any jobs yet.</p>
        ) : (
          <div className="space-y-6">
            {applications.map(app =>
              app.job ? (
                <div
                  key={app._id}
                  className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 p-5 rounded-lg shadow-lg border border-blue-700"
                >
                  <h3 className="text-xl font-semibold text-blue-100">{app.job.title}</h3>
                  <p className="text-gray-300">
                    <span className="font-semibold">Company:</span>{' '}
                    {app.job?.postedBy?.companyName || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Status:</span> {app.status}
                  </p>

                  <button
                    onClick={() => onWithdraw(app._id)}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
                  >
                    Withdraw Application
                  </button>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
