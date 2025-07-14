import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, RegisterData } from '../types';
import { authAPI } from '../api/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('gym_token');
    const storedUser = localStorage.getItem('gym_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      
      // For demo purposes, simulate login with demo accounts
      const demoUsers = {
        'admin@gymflow.com': {
          _id: '1',
          name: 'Admin User',
          email: 'admin@gymflow.com',
          role: 'admin' as UserRole,
          phone: '555-0001',
          isActive: true,
          joinDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'john@gymflow.com': {
          _id: '2',
          name: 'John Smith',
          email: 'john@gymflow.com',
          role: 'trainer' as UserRole,
          phone: '555-0002',
          isActive: true,
          joinDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'mike@example.com': {
          _id: '3',
          name: 'Mike Chen',
          email: 'mike@example.com',
          role: 'member' as UserRole,
          phone: '555-0004',
          isActive: true,
          joinDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      };

      const demoPasswords = {
        'admin@gymflow.com': 'admin123',
        'john@gymflow.com': 'trainer123',
        'mike@example.com': 'member123'
      };

      // Check if it's a demo account
      if (demoUsers[email as keyof typeof demoUsers] && demoPasswords[email as keyof typeof demoPasswords] === password) {
        const userData = demoUsers[email as keyof typeof demoUsers];
        const authToken = 'demo-token-' + userData.role;
        
        setUser(userData);
        setToken(authToken);
        
        localStorage.setItem('gym_token', authToken);
        localStorage.setItem('gym_user', JSON.stringify(userData));
        
        toast.success(`Welcome back, ${userData.name}!`);
        return;
      }

      // Try actual API call for non-demo accounts
      try {
        const response = await authAPI.login({ email, password });
      
        const { user: userData, token: authToken } = response.data;
      
        setUser(userData);
        setToken(authToken);
      
        localStorage.setItem('gym_token', authToken);
        localStorage.setItem('gym_user', JSON.stringify(userData));
      
        toast.success('Login successful!');
      } catch (apiError) {
        toast.error('Invalid credentials. Please use demo accounts or check your connection.');
        throw apiError;
      }
    } catch (error: any) {
      if (!error.message?.includes('demo accounts')) {
        const message = error.response?.data?.message || 'Login failed';
        toast.error(message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setLoading(true);
      
      // For demo purposes, simulate registration
      const newUser: User = {
        _id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        phone: userData.phone || '',
        isActive: true,
        joinDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const authToken = 'demo-token-' + newUser.role;
      
      setUser(newUser);
      setToken(authToken);
      
      localStorage.setItem('gym_token', authToken);
      localStorage.setItem('gym_user', JSON.stringify(newUser));
      
      toast.success('Registration successful! Welcome to GymFlow!');
      
      // Try actual API call in the background (optional)
      try {
        await authAPI.register(userData);
      } catch (apiError) {
        console.log('API registration failed, using demo mode');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gym_token');
    localStorage.removeItem('gym_user');
    toast.success('Logged out successfully');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};