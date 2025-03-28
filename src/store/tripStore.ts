import { create } from "zustand";
import { Trip, Booking } from "../types";
// import { format, addDays } from "date-fns";
import {
  createTrip,
  getTrips,
  getTripsByUser,
  updateTripStatus,
} from "@/services/tripService";
import { useAuthStore } from "./authStore";

interface TripState {
  trips: Trip[];
  bookings: Booking[];
  isLoading: boolean;
  fetchTrips: () => Promise<void>;
  fetchTripsByUser: (email: string) => Promise<void>;
  createTrip: (data: {
    departureLocation: string;
    destination: string;
    departureDate: Date;
    arrivalDate: Date;
    pricePerKg: number;
    currency: string;
    availableSpace: number;
    maxSize: string;
    notes?: string | undefined;
  }) => Promise<void>;
  bookTrip: (
    tripId: string,
    senderId: string,
    senderName: string,
    luggageSize: number,
    luggageDescription: string
  ) => Promise<void>;
  updateTripStatus: (tripId: string, status: Trip["status"]) => Promise<void>;
  updateBookingStatus: (
    bookingId: string,
    status: Booking["status"]
  ) => Promise<void>;
}

export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  bookings: [],
  isLoading: false,

  fetchTrips: async () => {
    set({ isLoading: true });

    try {
      const trips = await getTrips();

      set({ trips: trips, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching trips:", error);
    }
  },

  fetchTripsByUser: async (email: string) => {
    set({ isLoading: true });

    try {
      const trips = await getTripsByUser(email);

      set({ trips: trips, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching trips:", error);
    }
  },

  createTrip: async (tripData) => {
    set({ isLoading: true });

    try {
      const { user } = useAuthStore.getState();

      const { trips } = get();

      const newTrip: Trip = {
        ...tripData,
        id: (trips.length + 1).toString(),
        userName: (user && user.name) || "",
        userEmail: (user && user.email) || "",
        userProfilePic: (user && user.profilePicture) || "",
        status: "active",
        createdAt: new Date(),
      };

      await createTrip(newTrip);

      set({
        trips: [...trips, newTrip],
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error creating trip:", error);
    }
  },

  bookTrip: async (
    tripId,
    senderId,
    senderName,
    luggageSize,
    luggageDescription
  ) => {
    set({ isLoading: true });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { trips, bookings } = get();

      const trip = trips.find((t) => t.id === tripId);

      if (!trip) {
        throw new Error("Trip not found");
      }

      if (trip.availableSpace < luggageSize) {
        throw new Error("Not enough space available");
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
        status: "pending",
        paymentStatus: "pending",
        createdAt: new Date(),
      };

      // Update available space
      const updatedTrips = trips.map((t) => {
        if (t.id === tripId) {
          return {
            ...t,
            availableSpace: t.availableSpace - luggageSize,
          };
        }
        return t;
      });

      set({
        bookings: [...bookings, newBooking],
        trips: updatedTrips,
        isLoading: false,
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
      const { trips } = get();

      const updatedTrips = trips.map((trip) => {
        if (trip.id === tripId) {
          return { ...trip, status };
        }
        return trip;
      });

      await updateTripStatus(tripId, status);

      set({ trips: updatedTrips, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error updating trip status:", error);
    }
  },

  updateBookingStatus: async (bookingId, status) => {
    set({ isLoading: true });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { bookings } = get();

      const updatedBookings = bookings.map((booking) => {
        if (booking.id === bookingId) {
          return { ...booking, status };
        }
        return booking;
      });

      set({ bookings: updatedBookings, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error updating booking status:", error);
    }
  },
}));
