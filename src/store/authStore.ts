import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'sender@example.com',
    name: 'John Sender',
    role: 'sender',
    profilePicture: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    createdAt: new Date(),
    isActive: true
  },
  {
    id: '2',
    email: 'traveller@example.com',
    name: 'Jane Traveller',
    role: 'traveller',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    createdAt: new Date(),
    isActive: true
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
    isActive: true
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // In a real app, you would validate the password here
      
      set({ 
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  register: async (email: string, password: string, name: string, role: UserRole) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email,
        name,
        role,
        createdAt: new Date(),
        isActive: true
      };
      
      // In a real app, you would save the user to the database
      mockUsers.push(newUser);
      
      set({ 
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    set({ 
      user: null,
      isAuthenticated: false
    });
  }
}));