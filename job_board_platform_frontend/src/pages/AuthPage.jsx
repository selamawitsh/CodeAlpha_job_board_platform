import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';


export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login'); 

  const handleChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleChange('login')}>Login</button>
        <button onClick={() => handleChange('employer')}>Register as Employer</button>
        <button onClick={() => handleChange('jobseeker')}>Register as Job Seeker</button>
      </div>

      <div>
        {activeTab === 'login' && <LoginForm />}
        {activeTab === 'employer' && <RegisterForm role="employer" />}
        {activeTab === 'jobseeker' && <RegisterForm role="jobseeker" />}
      </div>
    </div>
  );
}
