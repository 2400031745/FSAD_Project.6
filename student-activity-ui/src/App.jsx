import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PortalSelection from './pages/PortalSelection';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portal-selection" element={<PortalSelection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
