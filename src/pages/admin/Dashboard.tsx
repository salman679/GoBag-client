import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  CreditCard,
  Star,
  BarChart2,
  Settings,
  User,
  Package,
  DollarSign,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useTripStore } from "../../store/tripStore";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { trips, bookings, fetchTrips } = useTripStore();
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "trips" | "bookings" | "payments" | "reviews"
  >("overview");

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in as an admin to access this page.
            </p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate dashboard stats
  const totalUsers = 150; // Mock data
  const totalTrips = trips.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.totalPrice * 0.1,
    0
  ); // 10% platform fee

  const activeTrips = trips.filter((trip) => trip.status === "active").length;
  const completedTrips = trips.filter(
    (trip) => trip.status === "completed"
  ).length;
  const cancelledTrips = trips.filter(
    (trip) => trip.status === "cancelled"
  ).length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;
  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-lg text-gray-600">
          Manage users, trips, bookings, and platform settings
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 mb-8 md:mb-0 md:mr-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-medium text-gray-900">Dashboard</h2>
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "overview"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BarChart2 className="h-5 w-5 mr-3" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "users"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Users className="h-5 w-5 mr-3" />
                Users
              </button>
              <button
                onClick={() => setActiveTab("trips")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "trips"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Briefcase className="h-5 w-5 mr-3" />
                Trips
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "bookings"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Package className="h-5 w-5 mr-3" />
                Bookings
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "payments"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                Payments
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                  activeTab === "reviews"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Star className="h-5 w-5 mr-3" />
                Reviews
              </button>
              <div className="border-t border-gray-200 my-2 pt-2">
                <button className="flex items-center w-full px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100">
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Platform Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Users</p>
                        <p className="text-3xl font-bold mt-1">{totalUsers}</p>
                      </div>
                      <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
                        <Users className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-4 text-blue-100 text-sm">
                      <span className="text-white font-medium">+12%</span> from
                      last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Total Trips</p>
                        <p className="text-3xl font-bold mt-1">{totalTrips}</p>
                      </div>
                      <div className="bg-green-400 bg-opacity-30 p-3 rounded-full">
                        <Briefcase className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-4 text-green-100 text-sm">
                      <span className="text-white font-medium">+8%</span> from
                      last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">
                          Total Bookings
                        </p>
                        <p className="text-3xl font-bold mt-1">
                          {totalBookings}
                        </p>
                      </div>
                      <div className="bg-purple-400 bg-opacity-30 p-3 rounded-full">
                        <Package className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-4 text-purple-100 text-sm">
                      <span className="text-white font-medium">+15%</span> from
                      last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-100 text-sm">Total Revenue</p>
                        <p className="text-3xl font-bold mt-1">
                          ${totalRevenue.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-yellow-400 bg-opacity-30 p-3 rounded-full">
                        <DollarSign className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-4 text-yellow-100 text-sm">
                      <span className="text-white font-medium">+20%</span> from
                      last month
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">
                      Trip Statistics
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm text-gray-600">
                            Active Trips
                          </span>
                        </div>
                        <span className="font-medium">{activeTrips}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm text-gray-600">
                            Completed Trips
                          </span>
                        </div>
                        <span className="font-medium">{completedTrips}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-sm text-gray-600">
                            Cancelled Trips
                          </span>
                        </div>
                        <span className="font-medium">{cancelledTrips}</span>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            Total
                          </span>
                          <span className="font-medium">{totalTrips}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">
                      Booking Statistics
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></div>
                          <span className="text-sm text-gray-600">
                            Pending Bookings
                          </span>
                        </div>
                        <span className="font-medium">{pendingBookings}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm text-gray-600">
                            Confirmed Bookings
                          </span>
                        </div>
                        <span className="font-medium">{confirmedBookings}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm text-gray-600">
                            Completed Bookings
                          </span>
                        </div>
                        <span className="font-medium">{completedBookings}</span>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            Total
                          </span>
                          <span className="font-medium">{totalBookings}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  User Management
                </h2>
                <Button size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            User
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Joined
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={`https://images.unsplash.com/photo-${
                                      1570295999919 + i
                                    }-b8c36b15f770`}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    User {i}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    user{i}@example.com
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  i % 3 === 0
                                    ? "bg-blue-100 text-blue-800"
                                    : i % 3 === 1
                                    ? "bg-green-100 text-green-800"
                                    : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {i % 3 === 0
                                  ? "Admin"
                                  : i % 3 === 1
                                  ? "Sender"
                                  : "Traveller"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  i % 5 === 0
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {i % 5 === 0 ? "Inactive" : "Active"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(2023, 0, i).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                href="#"
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                Edit
                              </a>
                              <a
                                href="#"
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "trips" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Trip Management
                </h2>
                <div className="flex space-x-2">
                  <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
                    <option>All Statuses</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                  <Button size="sm">Export</Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Trip
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Traveller
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Dates
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Bookings
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {trips.slice(0, 5).map((trip) => (
                          <tr key={trip.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {trip.departureLocation} to {trip.destination}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {trip.id}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8">
                                  {trip.travellerProfilePic ? (
                                    <img
                                      className="h-8 w-8 rounded-full"
                                      src={trip.travellerProfilePic}
                                      alt=""
                                    />
                                  ) : (
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                      <User className="h-4 w-4 text-blue-600" />
                                    </div>
                                  )}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {trip.travellerName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(
                                trip.departureDate
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(trip.arrivalDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  trip.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : trip.status === "completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {trip.status.charAt(0).toUpperCase() +
                                  trip.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {
                                bookings.filter((b) => b.tripId === trip.id)
                                  .length
                              }{" "}
                              bookings
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                href="#"
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                View
                              </a>
                              <a
                                href="#"
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {(activeTab === "bookings" ||
            activeTab === "payments" ||
            activeTab === "reviews") && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {activeTab === "bookings"
                  ? "Booking Management"
                  : activeTab === "payments"
                  ? "Payment Management"
                  : "Review Management"}
              </h2>
              <p className="text-gray-600 mb-6">
                This section is under development. Check back soon for updates.
              </p>
              <Button onClick={() => setActiveTab("overview")}>
                Return to Overview
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
