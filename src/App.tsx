import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './components/LandingPage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AdminDashboard from './components/dashboard/AdminDashboard';
import TrainerDashboard from './components/dashboard/TrainerDashboard';
import MemberDashboard from './components/dashboard/MemberDashboard';
import LoadingSpinner from './components/common/LoadingSpinner';

// Protected route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to correct dashboard based on role
  const expectedPath = `/${user.role}`;
  if (location.pathname !== expectedPath && !location.pathname.startsWith(expectedPath + '/')) {
    return <Navigate to={expectedPath} replace />;
  }
  
  return <>{children}</>;
};

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Protected Routes with Layout */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Layout>
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/trainer" element={
            <ProtectedRoute>
              <Layout>
                <PrivateRoute allowedRoles={['trainer']}>
                  <TrainerDashboard />
                </PrivateRoute>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/member" element={
            <ProtectedRoute>
              <Layout>
                <PrivateRoute allowedRoles={['member']}>
                  <MemberDashboard />
                </PrivateRoute>
              </Layout>
            </ProtectedRoute>
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
          }}
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;