import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Calendar, Weight, DollarSign, User, Package, Star } from 'lucide-react';
import { useTripStore } from '../../store/tripStore';
import { useAuthStore } from '../../store/authStore';
import { Trip, Booking } from '../../types';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';

const SenderBookings: React.FC = () => {
  const { trips, bookings, fetchTrips, updateBookingStatus, isLoading } = useTripStore();
  const { user } = useAuthStore();
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'completed' | 'cancelled'>('pending');
  
  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);
  
  useEffect(() => {
    if (bookings.length > 0 && user) {
      const filteredBookings = bookings.filter(booking => booking.senderId === user.id);
      setMyBookings(filteredBookings);
    }
  }, [ bookings, user]);
  
  const getFilteredBookings = () => {
    return myBookings.filter(booking => booking.status === activeTab);
  };
  
  const getTripForBooking = (tripId: string) => {
    return trips.find(trip => trip.id === tripId);
  };
  
  const handleCancelBooking = async (bookingId: string) => {
    await updateBookingStatus(bookingId, 'cancelled');
  };
  
  if (isLoading && myBookings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="mt-1 text-lg text-gray-600">
          Manage your luggage bookings
        </p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pending')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab('confirmed')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'confirmed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'cancelled'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Cancelled
          </button>
        </nav>
      </div>
      
      {/* Bookings List */}
      {getFilteredBookings().length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab} bookings</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'pending' || activeTab === 'confirmed' 
              ? "You don't have any bookings with this status."
              : `You don't have any ${activeTab} bookings.`}
          </p>
          <div className="mt-6">
            <Link to="/trips">
              <Button>
                Find Trips
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {getFilteredBookings().map((booking) => {
            const trip = getTripForBooking(booking.tripId);
            
            if (!trip) return null;
            
            return (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      {trip.departureLocation} to {trip.destination}
                    </h2>
                    <div className="mt-2 md:mt-0 flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      
                      {booking.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="ml-4"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel Booking
                        </Button>
                      )}
                      
                      {booking.status === 'completed' && (
                        <Link to={`/review/${booking.id}`} className="ml-4">
                          <Button size="sm" variant="outline">
                            <Star className="h-4 w-4 mr-1" />
                            Leave Review
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm text-gray-500">Traveller</p>
                          <p className="text-base font-medium text-gray-900">{trip.travellerName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm text-gray-500">Travel Dates</p>
                          <p className="text-base font-medium text-gray-900">
                            {format(new Date(trip.departureDate), 'MMM dd, yyyy')} - {format(new Date(trip.arrivalDate), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm text-gray-500">Route</p>
                          <p className="text-base font-medium text-gray-900">
                            {trip.departureLocation} → {trip.destination}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Weight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm text-gray-500">Your Luggage</p>
                          <p className="text-base font-medium text-gray-900">
                            {booking.luggageSize} kg
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{booking.luggageDescription}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm text-gray-500">Payment</p>
                          <p className="text-base font-medium text-gray-900">
                            {booking.totalPrice} {trip.currency} ({trip.pricePerKg} {trip.currency} per kg)
                          </p>
                          <p className={`text-sm mt-1 ${
                            booking.paymentStatus === 'paid' ? 'text-green-600' :
                            booking.paymentStatus === 'refunded' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                          </p>
                        </div>
                      </div>
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

export default SenderBookings;