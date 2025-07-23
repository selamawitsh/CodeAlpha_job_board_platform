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
      } else {
        res = await API.post('/jobs/job-post', form, {
          headers: { Authorization: `Bearer ${token}` },
        });// false = new job
      }
    } catch (error) {
      console.error('Job submission failed:', error);
      alert('Failed to submit job.');
    }
  };

  return (
    <div>
      <h3>{initialData ? 'Edit Job' : 'Post New Job'}</h3>

      <label>Title</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <label>Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <label>Location</label>
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
      />

      <label>Type</label>
      <input
        name="type"
        value={form.type}
        onChange={handleChange}
      />

      <label>Salary Range</label>
      <input
        name="salaryRange"
        value={form.salaryRange}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {initialData ? 'Save Changes' : 'Post Job'}
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
