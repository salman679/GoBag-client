import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./store/authStore";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import TripsList from "./pages/trips/TripsList";
import TripDetails from "./pages/trips/TripDetails";
import AdminDashboard from "./pages/admin/Dashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import TermsOfService from "./pages/terms/TermsOfService";
import PrivacyPolicy from "./pages/terms/PrivacyPolicy";
import SenderBookings from "./pages/sender/SenderBookings";
import TravelerTrips from "./pages/traveller/TravelerTrips";
import UserDashboardLayout from "./pages/user/UserDashboardLayout";
import UserDashboard from "./pages/user/components/UserDashboard";
import TripsPage from "./pages/user/components/trips/Trips";
import MyRequest from "./pages/user/components/myRequest/MyRequest";

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trips" element={<TripsList />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Traveler Routes */}
            {/* <Route
              path="/traveler/trips/create"
              element={
                <ProtectedRoute allowedRoles={["traveler"]}>
                  <CreateTrip />
                </ProtectedRoute>
              }
            />
            <Route
              path="/traveler/trips"
              element={
                <ProtectedRoute allowedRoles={["traveler"]}>
                  <TravelerTrips />
                </ProtectedRoute>
              }
            />
            <Route
              path="/traveler/dashboard"
              element={
                <ProtectedRoute allowedRoles={["traveler"]}>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/traveler/dashboard/earnings"
              element={
                <ProtectedRoute allowedRoles={["traveler"]}>
                  <DashboardLayout>
                    <EarningsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/traveler/dashboard/requests"
              element={
                <ProtectedRoute allowedRoles={["traveler"]}>
                  <DashboardLayout>
                    <RequestsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/traveler/dashboard/messages"
              element={
                <ProtectedRoute allowedRoles={["traveler"]}>
                  <DashboardLayout>
                    <MessagesPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/traveler/dashboard/trips"
              element={
                <ProtectedRoute allowedRoles={["traveler"]}>
                  <DashboardLayout>
                    <TripsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/traveler/dashboard/trust"
              element={
                <ProtectedRoute allowedRoles={["traveler"]}>
                  <DashboardLayout>
                    <TrustPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            /> */}

            {/* Sender Routes */}
            {/* <Route
              path="/sender/bookings"
              element={
                <ProtectedRoute allowedRoles={["sender"]}>
                  <SenderBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sender/dashboard"
              element={
                <ProtectedRoute allowedRoles={["sender"]}>
                  <SenderDashboardLayout>
                    <SenderDashboard />
                  </SenderDashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sender/new-request"
              element={
                <ProtectedRoute allowedRoles={["sender"]}>
                  <SenderDashboardLayout>
                    <NewRequest />
                  </SenderDashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sender/requests"
              element={
                <ProtectedRoute allowedRoles={["sender"]}>
                  <SenderDashboardLayout>
                    <MyRequests />
                  </SenderDashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sender/profile"
              element={
                <ProtectedRoute allowedRoles={["sender"]}>
                  <SenderDashboardLayout>
                    <Profile />
                  </SenderDashboardLayout>
                </ProtectedRoute>
              }
            /> */}

            {/* user Routes */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <UserDashboardLayout>
                    <UserDashboard />
                  </UserDashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/trips"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <UserDashboardLayout>
                    <TripsPage />
                  </UserDashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/packages"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <UserDashboardLayout>
                    <MyRequest />
                  </UserDashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/bookings"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <SenderBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/trips"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <TravelerTrips />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirect based on user role */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {user?.role === "admin" ? (
                    <Navigate to="/admin/dashboard" />
                  ) : (
                    <Navigate to="/user/dashboard" />
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
