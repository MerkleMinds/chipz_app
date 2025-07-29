/**
 * Auth Context
 * Provides authentication state and methods to the application
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService, User, LoginData, RegisterData, AuthState } from './authService';

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userId: number, data: Partial<User>) => Promise<User | null>;
  updateBalance: (data: { cusd_balance: string; balances: Record<string, string> }) => Promise<User | null>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateProfile: async () => null,
  updateBalance: async () => null,
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isAuthenticated = AuthService.isAuthenticated();
        const user = AuthService.getCurrentUser();

        setAuthState({
          isAuthenticated,
          user,
          loading: false,
          error: null,
        });

        // If authenticated, refresh the user profile
        if (isAuthenticated) {
          try {
            const profile = await AuthService.getProfile();
            if (profile) {
              setAuthState(prev => ({
                ...prev,
                user: profile,
              }));
            }
          } catch (error) {
            console.error('Failed to refresh user profile:', error);
          }
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Failed to initialize authentication',
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (data: LoginData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await AuthService.login(data);
      if (response) {
        setAuthState({
          isAuthenticated: true,
          user: response.user,
          loading: false,
          error: null,
        });
        return true;
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: 'Login failed',
        }));
        return false;
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: (error as Error).message || 'Login failed',
      }));
      return false;
    }
  };

  // Register function
  const register = async (data: RegisterData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await AuthService.register(data);
      if (response) {
        setAuthState({
          isAuthenticated: true,
          user: response.user,
          loading: false,
          error: null,
        });
        return true;
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: 'Registration failed',
        }));
        return false;
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: (error as Error).message || 'Registration failed',
      }));
      return false;
    }
  };

  // Logout function
  const logout = () => {
    AuthService.logout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  // Update profile function
  const updateProfile = async (userId: number, data: Partial<User>): Promise<User | null> => {
    setAuthState(prev => ({ ...prev, loading: true }));
    try {
      const updatedUser = await AuthService.updateProfile(userId, data);
      if (updatedUser) {
        setAuthState(prev => ({
          ...prev,
          user: updatedUser,
          loading: false,
        }));
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
      return updatedUser;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: (error as Error).message || 'Failed to update profile',
      }));
      return null;
    }
  };

  // Update balance function
  const updateBalance = async (data: { cusd_balance: string; balances: Record<string, string> }): Promise<User | null> => {
    setAuthState(prev => ({ ...prev, loading: true }));
    try {
      const updatedUser = await AuthService.updateBalance(data);
      if (updatedUser) {
        setAuthState(prev => ({
          ...prev,
          user: updatedUser,
          loading: false,
        }));
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
      return updatedUser;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: (error as Error).message || 'Failed to update balance',
      }));
      return null;
    }
  };

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateProfile,
        updateBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
