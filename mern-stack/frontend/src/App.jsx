import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login/Login.jsx';
import { Signup } from './components/Signup/Signup.jsx';
import { AdminLogin } from './components/AdminLogin/AdminLogin.jsx';
import { AdminSignUp } from './components/AdminSignup/AdminSignup.jsx';
import { ReportUserOrJob } from './components/ReportUserOrJob/ReportUserOrJob.jsx';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard.jsx';
import { ConfirmationPopUp } from './components/ConfirmationPopUp/ConfirmationPopUp.jsx';
import { EditWarningMessage } from './components/EditWarningMessage/EditWarningMessage.jsx';
import { JobDetails } from './components/JobDetails/JobDetails.jsx';
import { JobSearch } from './components/JobSearch/JobSearch.jsx';
import { NotificationSent } from './components/NotificationSent/NotificationSent.jsx';
import { Reviews } from './components/Reviews/Reviews.jsx';
import { UserFeedback } from './components/UserFeedback/UserFeedback.jsx';
import { UserSearch } from './components/UserSearch/UserSearch.jsx';
import { ViewUserDetails } from './components/ViewUserDetails/ViewUserDetails.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* User Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/forgot-password" 
          element={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              fontSize: '24px',
              fontFamily: 'Open Sans, Helvetica'
            }}>
              :closed_lock_with_key: Forgot Password - Coming Soon!
            </div>
          } 
        />
      

        {/* Admin Authentication Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        
        {/* Admin Dashboard & Management */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/feedback" element={<UserFeedback />} />
        <Route path="/admin/warning/:userId" element={<EditWarningMessage />} />
        <Route path="/admin/confirmation" element={<ConfirmationPopUp />} />
        <Route path="/admin/notification-sent" element={<NotificationSent />} />

        {/* User-Facing Routes */}
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/users" element={<UserSearch />} />
        <Route path="/users/:userId" element={<ViewUserDetails />} />
        <Route path="/reviews" element={<Reviews />} />
        
        {/* Report Routes */}
        <Route path="/report/user/:userId" element={<ReportUserOrJob />} />
        <Route path="/report/job/:jobId" element={<ReportUserOrJob />} />
        
        {/* User Dashboard (placeholder) */}
        <Route 
          path="/dashboard" 
          element={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              fontSize: '24px',
              fontFamily: 'Open Sans, Helvetica'
            }}>
              🎉 User Dashboard - Coming Soon!
            </div>
          } 
        />

        {/* Catch-all redirect - must be last */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;