import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { AuthService } from '../services/api';

interface User {
  id: number;
  email: string;
  fullName: string;
  role: 'CUSTOMER' | 'ADMIN';
  phoneNumber?: string;
  address?: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'ADMIN';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for fallback when API is not available
const mockUsers = [
  { 
    id: 1, 
    email: 'admin@telecom.com', 
    password: 'admin123', 
    fullName: 'Admin User', 
    role: 'ADMIN' as const,
    phoneNumber: '+1 (555) 000-0001',
    address: '123 Admin St, Admin City',
    isActive: true
  },
  { 
    id: 2, 
    email: 'customer@email.com', 
    password: 'customer123', 
    fullName: 'Customer User', 
    role: 'CUSTOMER' as const,
    phoneNumber: '+1 (555) 000-0002',
    address: '456 Customer Ave, Customer Town',
    isActive: true
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          try {
            // Try to validate token with backend if available
            try {
              await AuthService.validateToken();
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
              setIsAuthenticated(true);
            } catch (error) {
              // Backend not available, use stored user if valid
              const parsedUser = JSON.parse(storedUser);
              if (parsedUser && parsedUser.email) {
                setUser(parsedUser);
                setIsAuthenticated(true);
              } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
              }
            }
          } catch (error) {
            // Invalid stored data, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Try real API first
      try {
        const response = await AuthService.login(email, password);
        
        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          setUser(response.user);
          setIsAuthenticated(true);
          return true;
        }
      } catch (error) {
        console.log('API not available, using mock authentication');
        
        // Fallback to mock authentication
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Try real API first
      try {
        const response = await AuthService.register({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          role: data.role,
        });
        
        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          setUser(response.user);
          setIsAuthenticated(true);
          return true;
        }
      } catch (error) {
        console.log('API not available, using mock registration');
        
        // Fallback to mock registration
        const newUser: User = {
          id: Date.now(),
          email: data.email,
          fullName: data.fullName,
          role: data.role,
          phoneNumber: `+1 (555) ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          address: '123 New User St, Registration City',
          isActive: true
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
