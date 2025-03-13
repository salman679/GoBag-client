export type UserRole = "sender" | "traveler" | "admin";

export interface User {
  name: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: UserRole;
  password?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trip {
  id: string;
  travellerId: string;
  travellerName: string;
  travellerProfilePic?: string;
  departureLocation: string;
  destination: string;
  departureDate: Date;
  arrivalDate: Date;
  availableSpace: number; // in kg
  pricePerKg: number;
  currency: string;
  status: "active" | "completed" | "cancelled";
  description?: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  tripId: string;
  senderId: string;
  senderName: string;
  luggageSize: number; // in kg
  luggageDescription: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: Date;
}

export interface Review {
  id: string;
  tripId: string;
  bookingId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: "sender" | "traveller";
  targetId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "booking" | "trip" | "payment" | "system";
  isRead: boolean;
  createdAt: Date;
}
