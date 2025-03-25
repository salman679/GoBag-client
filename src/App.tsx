import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
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
import MyRequest from "./pages/user/components/myRequest/MyRequest";
import NewTrip from "./pages/user/components/trips/NewTrip";
import { Luggage, Plane, User, Home as HomeIcon } from "lucide-react";
import { cn } from "./lib/utils";
import AboutPage from "./pages/about/About";
import NewRequest from "./pages/user/components/myRequest/newRequest/NewRequest";
import ProhibitedItemsPage from "./pages/terms/ProhibitedItems";
import BrowsePackages from "./pages/packages/Packages";
import ContactPage from "./pages/contact/Contact";

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
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const mobileNavItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Trips", href: "/trips", icon: Plane },
    { name: "Packages", href: "/packages", icon: Luggage },
    { name: "Dashboard", href: "/user/dashboard", icon: User },
  ];

  return (
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
          <Route path="/packages" element={<BrowsePackages />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/prohibited-items" element={<ProhibitedItemsPage />} />

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
                  <TravelerTrips />
                </UserDashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/trips/new"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboardLayout>
                  <NewTrip />
                </UserDashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/requests"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboardLayout>
                  <MyRequest />
                </UserDashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/requests/new"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboardLayout>
                  <NewRequest />
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
            path="/user/my-trips"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <div className="px-4 sm:px-6 lg:px-8 py-12">
                  <TravelerTrips />
                </div>
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

        {/* Bottom navigation bar for mobile */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
            <div className="flex items-center justify-around h-16">
              {mobileNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-full px-2 text-xs",
                    pathname === item.href
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 mb-1" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
