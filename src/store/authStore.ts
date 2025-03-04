import { create } from "zustand";
import { User, UserRole } from "../types";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => Promise<void>;
  logout: () => void;
}

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "sender@example.com",
    name: "John Sender",
    role: "sender",
    profilePicture:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: "2",
    email: "traveller@example.com",
    name: "Jane Traveller",
    role: "traveller",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: "3",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date(),
    isActive: true,
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });

    try {
      // Simulate API call
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        //this is fake, here will be from database
        const user: User = {
          id: res.user.uid,
          email: res.user.email || "",
          name: res.user.displayName || "",
          role: "traveller",
          createdAt: new Date(),
          isActive: true,
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
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
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        updateProfile(auth.currentUser, { displayName: name });

        const newUser: User = {
          id: auth.currentUser.uid,
          email,
          name,
          role,
          createdAt: new Date(),
          isActive: true,
        };

        // In a real app, you would save the user to the database

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true });

    try {
      await signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
        console.log(res.user);

        // In a real app, you would save the user to the database

        const user = {
          id: res.user.uid || "",
          email: res.user.email || "",
          name: res.user.displayName || "",
          profilePicture: res.user.photoURL || "",
          role: "traveller",
          createdAt: new Date(),
          isActive: true,
        };

        set({
          user: user,
          isAuthenticated: true,
          isLoading: false,
        });
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  // signUpWithGoogle: async () => {
  //   set({ isLoading: true });

  //   try {
  //     await signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
  //       console.log(res.user);

  //       // In a real app, you would save the user to the database

  //       const user = {
  //         id: res.user.uid || "",
  //         email: res.user.email || "",
  //         name: res.user.displayName || "",
  //         profilePicture: res.user.photoURL || "",
  //         role: "traveller",
  //         createdAt: new Date(),
  //         isActive: true,
  //       };

  //       set({
  //         user: user,
  //         isAuthenticated: true,
  //         isLoading: false,
  //       });
  //     });
  //   } catch (error) {
  //     set({ isLoading: false });
  //     throw error;
  //   }
  // },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
