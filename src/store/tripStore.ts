import { create } from 'zustand';
import { Trip, Booking } from '../types';
import { format, addDays } from 'date-fns';

interface TripState {
  trips: Trip[];
  bookings: Booking[];
  isLoading: boolean;
  fetchTrips: () => Promise<void>;
  createTrip: (tripData: Omit<Trip, 'id' | 'createdAt' | 'status' | 'travellerName' | 'travellerProfilePic'>) => Promise<void>;
  bookTrip: (tripId: string, senderId: string, senderName: string, luggageSize: number, luggageDescription: string) => Promise<void>;
  updateTripStatus: (tripId: string, status: Trip['status']) => Promise<void>;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => Promise<void>;
}

// Generate mock data
const generateMockTrips = (): Trip[] => {
  const trips: Trip[] = [];
  
  const cities = [
    { name: 'New York', country: 'USA' },
    { name: 'London', country: 'UK' },
    { name: 'Paris', country: 'France' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Sydney', country: 'Australia' },
    { name: 'Dubai', country: 'UAE' },
    { name: 'Singapore', country: 'Singapore' },
    { name: 'Berlin', country: 'Germany' }
  ];
  
  for (let i = 1; i <= 10; i++) {
    const departureIndex = Math.floor(Math.random() * cities.length);
    let destinationIndex = Math.floor(Math.random() * cities.length);
    
    // Ensure departure and destination are different
    while (destinationIndex === departureIndex) {
      destinationIndex = Math.floor(Math.random() * cities.length);
    }
    
    const departureCity = cities[departureIndex];
    const destinationCity = cities[destinationIndex];
    
    const departureDate = addDays(new Date(), Math.floor(Math.random() * 30) + 1);
    const arrivalDate = addDays(departureDate, Math.floor(Math.random() * 3) + 1);
    
    trips.push({
      id: i.toString(),
      travellerId: (Math.floor(Math.random() * 5) + 1).toString(),
      travellerName: `Traveller ${i}`,
      travellerProfilePic: `https://images.unsplash.com/photo-${1570295999919 + i}-b8c36b15f770`,
      departureLocation: `${departureCity.name}, ${departureCity.country}`,
      destination: `${destinationCity.name}, ${destinationCity.country}`,
      departureDate,
      arrivalDate,
      availableSpace: Math.floor(Math.random() * 20) + 5,
      pricePerKg: Math.floor(Math.random() * 50) + 10,
      currency: 'USD',
      status: 'active',
      description: `Trip from ${departureCity.name} to ${destinationCity.name}. Can carry various items.`,
      createdAt: new Date()
    });
  }
  
  return trips;
};

export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  bookings: [],
  isLoading: false,
  
  fetchTrips: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTrips = generateMockTrips();
      set({ trips: mockTrips, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching trips:', error);
    }
  },
  
  createTrip: async (tripData) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { trips } = get();
      
      const newTrip: Trip = {
        ...tripData,
        id: (trips.length + 1).toString(),
        travellerName: 'Current User', // In a real app, this would come from the authenticated user
        status: 'active',
        createdAt: new Date()
      };
      
      set({ 
        trips: [...trips, newTrip],
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error creating trip:', error);
    }
  },
  
  bookTrip: async (tripId, senderId, senderName, luggageSize, luggageDescription) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { trips, bookings } = get();
      
      const trip = trips.find(t => t.id === tripId);
      
      if (!trip) {
        throw new Error('Trip not found');
      }
      
      if (trip.availableSpace < luggageSize) {
        throw new Error('Not enough space available');
      }
      
      const totalPrice = trip.pricePerKg * luggageSize;
      
      const newBooking: Booking = {
        id: (bookings.length + 1).toString(),
        tripId,
        senderId,
        senderName,
        luggageSize,
        luggageDescription,
        totalPrice,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date()
      };
      
      // Update available space
      const updatedTrips = trips.map(t => {
        if (t.id === tripId) {
          return {
            ...t,
            availableSpace: t.availableSpace - luggageSize
          };
        }
        return t;
      });
      
      set({ 
        bookings: [...bookings, newBooking],
        trips: updatedTrips,
        isLoading: false
      });
      
      return newBooking;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  updateTripStatus: async (tripId, status) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { trips } = get();
      
      const updatedTrips = trips.map(trip => {
        if (trip.id === tripId) {
          return { ...trip, status };
        }
        return trip;
      });
      
      set({ trips: updatedTrips, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error updating trip status:', error);
    }
  },
  
  updateBookingStatus: async (bookingId, status) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { bookings } = get();
      
      const updatedBookings = bookings.map(booking => {
        if (booking.id === bookingId) {
          return { ...booking, status };
        }
        return booking;
      });
      
      set({ bookings: updatedBookings, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error updating booking status:', error);
    }
  }
}));