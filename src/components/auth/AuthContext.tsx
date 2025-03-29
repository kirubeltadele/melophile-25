
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

type UserRole = 'individual' | 'pharmacy' | 'hospital' | 'consultant' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = {
  individual: {
    id: 'ind-123',
    name: 'Abebe Kebede',
    email: 'abebe@example.com',
    role: 'individual' as UserRole,
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  pharmacy: {
    id: 'pharm-456',
    name: 'Selam Pharmacy',
    email: 'selam@pharmacy.com',
    role: 'pharmacy' as UserRole,
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  hospital: {
    id: 'hosp-789',
    name: 'Ethio Health Hospital',
    email: 'info@ethiohealth.com',
    role: 'hospital' as UserRole,
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  consultant: {
    id: 'cons-789',
    name: 'Dr. Tigist Haile',
    email: 'tigist@health.com',
    role: 'consultant' as UserRole,
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('melophile_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we're using mock users
      let mockUser;
      if (role === 'individual') mockUser = MOCK_USERS.individual;
      else if (role === 'pharmacy') mockUser = MOCK_USERS.pharmacy;
      else if (role === 'hospital') mockUser = MOCK_USERS.hospital;
      else if (role === 'consultant') mockUser = MOCK_USERS.consultant;
      
      if (!mockUser) {
        throw new Error('Invalid role');
      }
      
      setUser(mockUser);
      localStorage.setItem('melophile_user', JSON.stringify(mockUser));
      toast.success(`Welcome back, ${mockUser.name}!`);
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user with the provided details
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
      };
      
      setUser(newUser);
      localStorage.setItem('melophile_user', JSON.stringify(newUser));
      toast.success('Registration successful!');
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('melophile_user');
    toast.info('You have been logged out.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
