import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const parsed = JSON.parse(user);
      const token = parsed?.token;
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Failed to parse user token from localStorage:", e);
    }
  }
  return req;
});

export default API;
