import { Trip } from "@/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createTrip = async (trip: Trip) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/trips/create-trip`,
      trip
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getTrips = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/trips/all`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error getting trips:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getTripsByUser = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/trips/user/${email}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error getting trips:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateTripStatus = async (id: string, status: string) => {
  try {
    console.log(id, status);

    const response = await axios.put(`${API_URL}/api/v1/trips/${id}`, {
      status,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error getting trips:",
      error.response?.data || error.message
    );
    throw error;
  }
};
