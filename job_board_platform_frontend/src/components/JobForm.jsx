import { useState, useEffect } from 'react';
import API from '../services/api';

export default function JobForm({ initialData, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    salaryRange: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    try {
      let res;
      if (initialData?._id) {
        res = await API.put(`/jobs/update-job/${initialData._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onSuccess(res.data, true);
        alert("The job has been updated.");
      } else {
        res = await API.post('/jobs/job-post', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onSuccess(res.data, false);
        alert("Job posted successfully!");
      }
    } catch (error) {
      console.error('Job submission failed:', error);
      alert('Failed to submit job.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 py-10 px-4 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          {initialData ? 'Edit Job' : 'Post New Job'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Job Title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Job Description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Job Location"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Type</label>
            <input
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Full-time, Part-time, Internship"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Salary Range</label>
            <input
              name="salaryRange"
              value={form.salaryRange}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., $3000 - $5000"
              required
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-200"
            >
              {initialData ? 'Save Changes' : 'Post Job'}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
