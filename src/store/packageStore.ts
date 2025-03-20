import { create } from "zustand";
import { Package } from "../types";
// import {
//   createPackage,
//   getPackages,
//   getPackagesBySender,
//   updatePackageStatus,
// } from "@/services/packageService";
import { useAuthStore } from "./authStore";
import { createPackage } from "@/services/packageService";

interface PackageState {
  packages: Package[];
  isLoading: boolean;
  fetchPackages: () => Promise<void>;
  fetchPackagesBySender: (email: string) => Promise<void>;
  createPackage: (data: {
    departureCity: string;
    departureCountry: string;
    destinationCity: string;
    destinationCountry: string;
    deliveryDate: Date;
    packageSize: string;
    weight: number;
    description: string;
    budget: number;
    currency: string;
    specialInstructions?: string;
  }) => Promise<void>;
  updatePackageStatus: (
    packageId: string,
    status: Package["status"]
  ) => Promise<void>;
}

export const usePackageStore = create<PackageState>((set, get) => ({
  packages: [],
  isLoading: false,

  fetchPackages: async () => {
    set({ isLoading: true });
    try {
      const packages = await getPackages();
      set({ packages, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching packages:", error);
    }
  },

  fetchPackagesBySender: async (email: string) => {
    set({ isLoading: true });
    try {
      const packages = await getPackagesBySender(email);
      set({ packages, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching packages by sender:", error);
    }
  },

  createPackage: async (packageData) => {
    set({ isLoading: true });
    try {
      const { user } = useAuthStore.getState();
      const { packages } = get();

      console.log(packageData);

      const newPackage: Package = {
        ...packageData,
        senderName: user?.name || "",
        senderEmail: user?.email || "",
        senderProfilePic: user?.profilePicture || "",
        status: "pending",
        createdAt: new Date(),
      };

      await createPackage(newPackage);
      set({ packages: [...packages, newPackage], isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error creating package:", error);
    }
  },

  updatePackageStatus: async (packageId, status) => {
    set({ isLoading: true });
    try {
      const { packages } = get();
      const updatedPackages = packages.map((pkg) =>
        pkg.id === packageId ? { ...pkg, status } : pkg
      );

      await updatePackageStatus(packageId, status);
      set({ packages: updatedPackages, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error updating package status:", error);
    }
  },
}));
