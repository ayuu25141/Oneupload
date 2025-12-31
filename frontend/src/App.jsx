import { Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './page/Dashboard';
import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Viewimage from './dashboardcomponent/Viewimage';
import './App.css';

function AppContent() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={currentUser ? <Navigate to="/dashboard" replace /> : <Signup />} 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
{/* Image View Route (Public) */}
      <Route path="/view/:public_id" element={<Viewimage />} />
      {/* 404 */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
      {/* Public Routes */}
      <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={currentUser ? <Navigate to="/dashboard" replace /> : <Signup />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />

      {/* Default Route */}
      <Route path="/" element={
        currentUser ? 
        <Navigate to="/dashboard" replace /> : 
        <Navigate to="/login" replace />
      } />

      {/* 404 */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

function App() {
  return (
    <Fragment>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Fragment>
  );
}

export default App;
