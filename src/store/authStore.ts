import { create } from "zustand";
import { User, UserRole } from "../types";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { createUser, getUserByEmail } from "@/services/authService";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => Promise<void>;
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string, rememberMe: boolean) => {
    set({ isLoading: true });

    try {
      //user data will save in localstorage
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      // Authenticate with Firebase
      await signInWithEmailAndPassword(auth, email, password);

      const {
        displayName,
        email: userEmail,
        photoURL,
        role,
      } = await getUserByEmail(email);

      const user: User = {
        name: displayName,
        email: userEmail,
        phoneNumber: "",
        profilePicture: photoURL || "",
        role,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Update Zustand store
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      console.log("User logged in:", user);
    } catch (error) {
      console.error("Login Error:", error);
      set({ isLoading: false });
    }
  },

  register: async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    set({ isLoading: true });

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });

      const newUser: User = {
        name,
        email,
        role,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await createUser(newUser);

      set({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true });

    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());
      const { email, displayName, photoURL } = res.user;

      const user: User = {
        email: email || "",
        name: displayName || "",
        profilePicture: photoURL || "",
        role: "traveler",
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      //user data to real database
      await createUser(user);

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      console.log("User signed in:", user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      set({ isLoading: false });
    }
  },

  signInWithFacebook: async () => {
    set({ isLoading: true });

    try {
      const res = await signInWithPopup(auth, new FacebookAuthProvider());
      const { email, displayName, photoURL } = res.user;

      const user: User = {
        email: email || "",
        name: displayName || "",
        profilePicture: photoURL || "",
        role: "traveler",
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      //user data to real database
      await createUser(user);

      set({
        user: user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  sendPasswordResetEmail: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent to:", email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
