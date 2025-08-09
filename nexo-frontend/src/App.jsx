import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

// Pages
import LoginPage from './pages/login/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import PlanningPage from './pages/planning/PlanningPage';
import TrackingPage from './pages/tracking/TrackingPage';
import IntelligencePage from './pages/intelligence/IntelligencePage';
import SettingsPage from './pages/settings/SettingsPage';

// Layout
import MainLayout from './components/layout/MainLayout';

// Context
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="planning" element={<PlanningPage />} />
                <Route path="tracking" element={<TrackingPage />} />
                <Route path="intelligence" element={<IntelligencePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

