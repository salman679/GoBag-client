import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import TripsList from './pages/trips/TripsList';
import TripDetails from './pages/trips/TripDetails';
import CreateTrip from './pages/traveller/CreateTrip';
import TravellerTrips from './pages/traveller/TravellerTrips';
import SenderBookings from './pages/sender/SenderBookings';
import AdminDashboard from './pages/admin/Dashboard';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

function App() {
  const { user } = useAuthStore();
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trips" element={<TripsList />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            
            {/* Traveller Routes */}
            <Route 
              path="/traveller/trips/create" 
              element={
                <ProtectedRoute allowedRoles={['traveller']}>
                  <CreateTrip />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/traveller/trips" 
              element={
                <ProtectedRoute allowedRoles={['traveller']}>
                  <TravellerTrips />
                </ProtectedRoute>
              } 
            />
            
            {/* Sender Routes */}
            <Route 
              path="/sender/bookings" 
              element={
                <ProtectedRoute allowedRoles={['sender']}>
                  <SenderBookings />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect based on user role */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  {user?.role === 'admin' ? (
                    <Navigate to="/admin/dashboard" />
                  ) : user?.role === 'traveller' ? (
                    <Navigate to="/traveller/trips" />
                  ) : (
                    <Navigate to="/sender/bookings" />
                  )}
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;