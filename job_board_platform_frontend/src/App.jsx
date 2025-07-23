import { Routes, Route } from "react-router-dom";
import AuthPage from './pages/AuthPage';
import JobBoard from "./pages/JobBoard";
import EmployerDashboard from "./pages/EmployerDashboard";
import LoginForm from "./components/LoginForm";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import EmployerApplications from './pages/EmployerApplications.jsx'

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path='/login' element={<LoginForm/>}/>
      <Route path="/jobs" element={<JobBoard />} />
      <Route path="/employer/manage-jobs" element={<EmployerDashboard />} />
      <Route path="/upload-resume/:jobId" element={<ResumeUploadPage />} />
      <Route path="/employer-application" element={<EmployerApplications/>} />
    </Routes>
  );
}

export default App;
