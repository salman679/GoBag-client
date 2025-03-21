import { Package } from "@/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createPackage = async (pkg: Package) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/requests/create-request`,
      pkg
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating package:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getPackages = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/requests/all`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error getting packages:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getPackagesByUser = async (email: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/packages/user/${email}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error getting packages:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updatePackageStatus = async (id: string, status: string) => {
  try {
    console.log(id, status);
    const response = await axios.put(`${API_URL}/api/v1/packages/${id}`, {
      status,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating package status:",
      error.response?.data || error.message
    );
    throw error;
  }
};
