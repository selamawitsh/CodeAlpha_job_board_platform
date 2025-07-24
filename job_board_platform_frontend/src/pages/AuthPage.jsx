import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');

  const handleChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex flex-col items-center justify-center px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white text-center">Welcome to CareerConnect</h1>
        <p className="text-gray-300 text-center mt-2">Login or Register to get started</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-5 py-2 rounded-lg text-white font-semibold transition 
            ${activeTab === 'login' ? 'bg-blue-700 shadow-lg' : 'bg-blue-900 hover:bg-blue-800'}`}
          onClick={() => handleChange('login')}
        >
          Login
        </button>
        <button
          className={`px-5 py-2 rounded-lg text-white font-semibold transition 
            ${activeTab === 'employer' ? 'bg-blue-700 shadow-lg' : 'bg-blue-900 hover:bg-blue-800'}`}
          onClick={() => handleChange('employer')}
        >
          Register as Employer
        </button>
        <button
          className={`px-5 py-2 rounded-lg text-white font-semibold transition 
            ${activeTab === 'jobseeker' ? 'bg-blue-700 shadow-lg' : 'bg-blue-900 hover:bg-blue-800'}`}
          onClick={() => handleChange('jobseeker')}
        >
          Register as Job Seeker
        </button>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        {activeTab === 'login' && <LoginForm />}
        {activeTab === 'employer' && <RegisterForm role="employer" />}
        {activeTab === 'jobseeker' && <RegisterForm role="jobseeker" />}
      </div>
    </div>
  );
}
