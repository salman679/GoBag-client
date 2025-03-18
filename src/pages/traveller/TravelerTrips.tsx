import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Plus,
  // MapPin,
  Calendar,
  Weight,
  DollarSign,
  User,
  Package,
} from "lucide-react";
import { useTripStore } from "../../store/tripStore";
import { useAuthStore } from "../../store/authStore";
import { Trip } from "../../types";
import { Button } from "../../components/Button";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

const TravelerTrips: React.FC = () => {
  const { trips, bookings, fetchTrips, updateTripStatus, isLoading } =
    useTripStore();
  const { user } = useAuthStore();
  const [myTrips, setMyTrips] = useState<Trip[]>([]);
  const [activeTab, setActiveTab] = useState<
    "active" | "completed" | "cancelled"
  >("active");

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    if (trips.length > 0 && user) {
      const filteredTrips = trips.filter(
        (trip) => trip.userEmail === user.email
      );
      setMyTrips(filteredTrips);
    }
  }, [trips, user]);

  const getFilteredTrips = () => {
    return myTrips.filter((trip) => trip.status === activeTab);
  };

  const getTripBookings = (tripId: string) => {
    return bookings.filter((booking) => booking.tripId === tripId);
  };

  const handleUpdateStatus = async (tripId: string, status: Trip["status"]) => {
    await updateTripStatus(tripId, status);
  };

  if (isLoading && myTrips.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="mt-1 text-lg text-gray-600">
            Manage your trips and bookings
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/traveller/trips/create">
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Create New Trip
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("active")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "active"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "completed"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab("cancelled")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "cancelled"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Cancelled
          </button>
        </nav>
      </div>

      {/* Trip List */}
      {getFilteredTrips().length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No {activeTab} trips
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === "active"
              ? "You don't have any active trips. Create a new trip to get started."
              : `You don't have any ${activeTab} trips.`}
          </p>
          {activeTab === "active" && (
            <div className="mt-6">
              <Link to="/traveler/trips/create">
                <Button>
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Trip
                </Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {getFilteredTrips().map((trip) => {
            const tripBookings = getTripBookings(trip.id);
            const totalBooked = tripBookings.reduce(
              (sum, booking) => sum + booking.luggageSize,
              0
            );
            const totalEarnings = tripBookings.reduce(
              (sum, booking) => sum + booking.totalPrice,
              0
            );

            return (
              <Card key={trip.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      {trip.departureLocation} to {trip.destination}
                    </h2>
                    <div className="mt-2 md:mt-0 flex items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
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

                      {trip.status === "active" && (
                        <div className="ml-4 flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUpdateStatus(trip.id, "completed")
                            }
                          >
                            Mark Completed
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUpdateStatus(trip.id, "cancelled")
                            }
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm text-gray-500">Travel Dates</p>
                          <p className="text-base font-medium text-gray-900">
                            {format(
                              new Date(trip.departureDate),
                              "MMM dd, yyyy"
                            )}{" "}
                            -{" "}
                            {format(new Date(trip.arrivalDate), "MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Weight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm text-gray-500">Luggage Space</p>
                          <p className="text-base font-medium text-gray-900">
                            {trip.availableSpace} kg total ({totalBooked} kg
                            booked, {trip.availableSpace - totalBooked} kg
                            available)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm text-gray-500">
                            Price & Earnings
                          </p>
                          <p className="text-base font-medium text-gray-900">
                            {trip.pricePerKg} {trip.currency} per kg (Total
                            earnings: {totalEarnings} {trip.currency})
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Bookings ({tripBookings.length})
                      </h3>
                      {tripBookings.length === 0 ? (
                        <p className="text-gray-500">No bookings yet</p>
                      ) : (
                        <div className="space-y-3">
                          {tripBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className="bg-gray-50 p-3 rounded-md"
                            >
                              <div className="flex items-start">
                                <User className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div className="ml-2">
                                  <p className="text-sm font-medium text-gray-900">
                                    {booking.senderName}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {booking.luggageSize} kg -{" "}
                                    {booking.totalPrice} {trip.currency}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {booking.luggageDescription}
                                  </p>
                                  <div className="mt-2 flex items-center">
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                        booking.status === "confirmed"
                                          ? "bg-green-100 text-green-800"
                                          : booking.status === "completed"
                                          ? "bg-blue-100 text-blue-800"
                                          : booking.status === "cancelled"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-yellow-100 text-yellow-800"
                                      }`}
                                    >
                                      {booking.status.charAt(0).toUpperCase() +
                                        booking.status.slice(1)}
                                    </span>
                                    <span className="mx-2 text-gray-300">
                                      |
                                    </span>
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                        booking.paymentStatus === "paid"
                                          ? "bg-green-100 text-green-800"
                                          : booking.paymentStatus === "refunded"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-yellow-100 text-yellow-800"
                                      }`}
                                    >
                                      {booking.paymentStatus
                                        .charAt(0)
                                        .toUpperCase() +
                                        booking.paymentStatus.slice(1)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link to={`/trips/${trip.id}`}>
                      <Button variant="outline">View Trip Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TravelerTrips;
