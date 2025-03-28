import { create } from "zustand";

interface Booking {
  id: string;
  tripId: string;
  senderId: string;
  senderName: string;
  luggageSize: number;
  luggageDescription: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
}

interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  fetchBookings: () => Promise<void>;
  fetchBookingsBySender: (email: string) => Promise<void>;
  fetchBookingsByTraveler: (email: string) => Promise<void>;
  bookTrip: (
    tripId: string,
    senderId: string,
    luggageSize: number,
    luggageDescription: string
  ) => Promise<void>;
  bookPackage: (packageId: string, message: string) => Promise<void>;
  updateBookingStatus: (
    bookingId: string,
    status: "pending" | "confirmed" | "cancelled" | "completed"
  ) => Promise<void>;
  updateBookingPaymentStatus: (
    bookingId: string,
    paymentStatus: "pending" | "paid" | "refunded"
  ) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  isLoading: false,

  fetchBookings: async () => {
    set({ isLoading: true });
    const response = await fetch("/api/bookings");
    const data = await response.json();
    set({ bookings: data, isLoading: false });
  },

  fetchBookingsBySender: async (email: string) => {
    set({ isLoading: true });
    const response = await fetch(`/api/bookings?email=${email}`);
    const data = await response.json();
    set({ bookings: data, isLoading: false });
  },

  fetchBookingsByTraveler: async (email: string) => {
    set({ isLoading: true });
    const response = await fetch(`/api/bookings/traveler?email=${email}`);
    const data = await response.json();
    set({ bookings: data, isLoading: false });
  },

  bookTrip: async (
    tripId: string,
    senderId: string,
    luggageSize: number,
    luggageDescription: string
  ) => {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tripId,
        senderId,
        luggageSize,
        luggageDescription,
      }),
    });

    const data = await response.json();
    set({ bookings: [...get().bookings, data] });
  },

  bookPackage: async (packageId: string, bookingMassage: string) => {
    const response = await fetch("/api/bookings/package", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageId,
        bookingMassage,
      }),
    });

    const data = await response.json();
    set({ bookings: [...get().bookings, data] });
  },

  updateBookingStatus: async (
    bookingId: string,
    status: "pending" | "confirmed" | "cancelled" | "completed"
  ) => {
    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    set({
      bookings: get().bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: data.status } : booking
      ),
    });
  },

  updateBookingPaymentStatus: async (
    bookingId: string,
    paymentStatus: "pending" | "paid" | "refunded"
  ) => {
    const response = await fetch(`/api/bookings/${bookingId}/payment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentStatus }),
    });

    const data = await response.json();
    set({
      bookings: get().bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, paymentStatus: data.paymentStatus }
          : booking
      ),
    });
  },
}));
