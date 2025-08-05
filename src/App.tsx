import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Billing from './pages/Billing';

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/login';
    return user?.role === 'admin' ? '/admin' : '/dashboard';
  };
  
  return (
    <div className="app">
      <Routes>
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? <Login /> : <Navigate to={getDefaultRoute()} replace />
          } 
        />
        <Route 
          path="/register" 
          element={
            !isAuthenticated ? <Register /> : <Navigate to={getDefaultRoute()} replace />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/billing" 
          element={
            <ProtectedRoute requiredRole="customer">
              <Billing />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/" 
          element={<Navigate to={getDefaultRoute()} replace />} 
        />
        <Route 
          path="*" 
          element={<Navigate to={getDefaultRoute()} replace />} 
        />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
