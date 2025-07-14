import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './components/LandingPage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AdminDashboard from './components/dashboard/AdminDashboard';
import TrainerDashboard from './components/dashboard/TrainerDashboard';
import MemberDashboard from './components/dashboard/MemberDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              
              {/* Protected Routes with Layout */}
              <Route path="/admin" element={
                <Layout>
                  <PrivateRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </PrivateRoute>
                </Layout>
              } />
              
              <Route path="/trainer" element={
                <Layout>
                  <PrivateRoute allowedRoles={['trainer']}>
                    <TrainerDashboard />
                  </PrivateRoute>
                </Layout>
              } />
              
              <Route path="/member" element={
                <Layout>
                  <PrivateRoute allowedRoles={['member']}>
                    <MemberDashboard />
                  </PrivateRoute>
                </Layout>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg, #333)',
                  color: 'var(--toast-color, #fff)',
                },
                success: {
                  style: {
                    background: '#10B981',
                    color: '#fff',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
                    color: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;