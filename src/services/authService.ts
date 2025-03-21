/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createUser = async (user: User) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/users/create-user`,
      user
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

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/users/${email}`);
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.log(error);

    console.error(
      "Error getting user by email:",
      error.response?.data || error.message
    );
    throw error;
  }
};
