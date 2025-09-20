import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Membership from './pages/Membership';
import MemberSearch from './pages/MemberSearch';
import MemberDashboard from './pages/MemberDashboard';
import AddGame from './pages/AddGame';
import Collections from './pages/Collections';
import LoadingSpinner from './components/LoadingSpinner';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// App Layout Component
const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Main App Component
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Loading GameoN..." />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <Navigate to="/member" replace />
          ) : (
            <Login />
          )
        } 
      />
      
      {/* Membership can be accessed without login */}
      <Route 
        path="/membership" 
        element={
          <AppLayout>
            <Membership />
          </AppLayout>
        } 
      />

      {/* Protected Routes */}
      <Route 
        path="/member-search" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <MemberSearch />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/member" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <MemberDashboard />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/add-game" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <AddGame />
            </AppLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/collections" 
        element={
          <ProtectedRoute>
            <AppLayout>
              <Collections />
            </AppLayout>
          </ProtectedRoute>
        } 
      />

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;