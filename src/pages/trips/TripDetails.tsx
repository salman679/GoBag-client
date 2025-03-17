import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import {
  MapPin,
  Calendar,
  Weight,
  DollarSign,
  User,
  Info,
  MessageCircle,
} from "lucide-react";
import { useTripStore } from "../../store/tripStore";
import { useAuthStore } from "../../store/authStore";
import { Trip } from "../../types";
import { Button } from "../../components/Button";
import { Input } from "../../components/ui/Input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../components/ui/Card";

const TripDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { trips, fetchTrips, bookTrip, isLoading } = useTripStore();
  const { user, isAuthenticated } = useAuthStore();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [luggageSize, setLuggageSize] = useState<number>(1);
  const [luggageDescription, setLuggageDescription] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    if (trips.length > 0 && id) {
      const foundTrip = trips.find((t) => t.id === id);
      if (foundTrip) {
        setTrip(foundTrip);
      }
    }
  }, [trips, id]);

  const handleBookTrip = async () => {
    if (!trip || !user) return;

    try {
      setBookingError(null);

      if (luggageSize <= 0) {
        setBookingError("Luggage size must be greater than 0");
        return;
      }

      if (luggageSize > trip.availableSpace) {
        setBookingError(
          `The traveler only has ${trip.availableSpace}kg of space available`
        );
        return;
      }

      if (!luggageDescription.trim()) {
        setBookingError("Please provide a description of your luggage");
        return;
      }

      await bookTrip(
        trip.id,
        user._id,
        user.name,
        luggageSize,
        luggageDescription
      );

      setBookingSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setBookingError(error.message);
      } else {
        setBookingError("An error occurred while booking the trip");
      }
    }
  };

  if (!trip) {
    return (
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const totalPrice = luggageSize * trip.pricePerKg;

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          to="/trips"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all trips
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Trip Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  Trip from {trip.departureLocation} to {trip.destination}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    trip.status === "active"
                      ? "bg-green-100 text-green-800"
                      : trip.status === "completed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  {trip.travellerProfilePic ? (
                    <img
                      src={trip.travellerProfilePic}
                      alt={trip.travellerName}
                      className="object-cover w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    {trip.travellerName}
                  </h2>
                  <p className="text-sm text-gray-500">Traveller</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <p className="text-sm text-gray-500">From</p>
                      <p className="text-base font-medium text-gray-900">
                        {trip.departureLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <p className="text-sm text-gray-500">Departure Date</p>
                      <p className="text-base font-medium text-gray-900">
                        {format(new Date(trip.departureDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Weight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <p className="text-sm text-gray-500">Available Space</p>
                      <p className="text-base font-medium text-gray-900">
                        {trip.availableSpace} kg
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <p className="text-sm text-gray-500">To</p>
                      <p className="text-base font-medium text-gray-900">
                        {trip.destination}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <p className="text-sm text-gray-500">Arrival Date</p>
                      <p className="text-base font-medium text-gray-900">
                        {format(new Date(trip.arrivalDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <p className="text-sm text-gray-500">Price per kg</p>
                      <p className="text-base font-medium text-gray-900">
                        {trip.pricePerKg} {trip.currency}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {trip.description && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    Description
                  </h3>
                  <p className="text-gray-600">{trip.description}</p>
                </div>
              )}

              <div className="pt-6 mt-6 border-t border-gray-200">
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  Important Information
                </h3>
                <div className="p-4 rounded-md bg-blue-50">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-blue-800">
                        For Senders
                      </h4>
                      <div className="mt-2 space-y-1 text-sm text-blue-700">
                        <p>
                          • Contact the traveler after booking to arrange pickup
                          and delivery details.
                        </p>
                        <p>
                          • Ensure your items comply with airline regulations
                          and customs requirements.
                        </p>
                        <p>
                          • Payment is held securely until the delivery is
                          confirmed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">
                Book Luggage Space
              </h2>
            </CardHeader>

            <CardContent>
              {bookingSuccess ? (
                <div className="p-4 mb-4 border border-green-200 rounded-md bg-green-50">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Booking Successful!
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          Your booking has been confirmed. You can view your
                          booking details in your account.
                        </p>
                      </div>
                      <div className="mt-4">
                        <Link to="/sender/bookings">
                          <Button variant="outline" size="sm">
                            View My Bookings
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {bookingError && (
                    <div className="p-4 mb-4 border border-red-200 rounded-md bg-red-50">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Error
                          </h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>{bookingError}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isAuthenticated ? (
                    <div className="py-6 text-center">
                      <p className="mb-4 text-gray-600">
                        You need to be logged in to book luggage space.
                      </p>
                      <Link to="/login">
                        <Button>Log In</Button>
                      </Link>
                      <p className="mt-4 text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link
                          to="/register"
                          className="text-blue-600 hover:text-blue-500"
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  ) : user?.role !== "sender" ? (
                    <div className="py-6 text-center">
                      <p className="mb-4 text-gray-600">
                        Only senders can book luggage space.
                      </p>
                      <p className="text-sm text-gray-500">
                        You are currently logged in as a {user?.role}.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Luggage Size (kg)
                        </label>
                        <Input
                          type="number"
                          value={luggageSize}
                          onChange={(e) =>
                            setLuggageSize(parseFloat(e.target.value))
                          }
                          min="0.1"
                          max={trip.availableSpace}
                          step="0.1"
                          fullWidth
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Max available: {trip.availableSpace} kg
                        </p>
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Luggage Description
                        </label>
                        <textarea
                          value={luggageDescription}
                          onChange={(e) =>
                            setLuggageDescription(e.target.value)
                          }
                          rows={3}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Describe your luggage (type, contents, special handling requirements, etc.)"
                        />
                      </div>

                      <div className="p-4 rounded-md bg-gray-50">
                        <h4 className="mb-2 text-sm font-medium text-gray-900">
                          Price Summary
                        </h4>
                        <div className="flex justify-between mb-1 text-sm text-gray-600">
                          <span>
                            {luggageSize} kg × {trip.pricePerKg} {trip.currency}
                          </span>
                          <span>
                            {totalPrice} {trip.currency}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1 text-sm text-gray-600">
                          <span>Service Fee</span>
                          <span>
                            {Math.round(totalPrice * 0.1)} {trip.currency}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 my-2 font-medium border-t border-gray-200">
                          <span>Total</span>
                          <span>
                            {Math.round(totalPrice * 1.1)} {trip.currency}
                          </span>
                        </div>
                      </div>

                      <Button
                        fullWidth
                        onClick={handleBookTrip}
                        isLoading={isLoading}
                        disabled={trip.status !== "active"}
                      >
                        Book Now
                      </Button>

                      <p className="mt-2 text-xs text-center text-gray-500">
                        By booking, you agree to our{" "}
                        <Link
                          to="/terms"
                          className="text-blue-600 hover:text-blue-500"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-blue-600 hover:text-blue-500"
                        >
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>

            <CardFooter className="border-t border-gray-200 bg-gray-50">
              <div className="w-full">
                <div className="flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Questions?{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Contact the traveler
                    </a>
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
