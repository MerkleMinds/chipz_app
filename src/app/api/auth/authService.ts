/**
 * Authentication Service
 * Handles user authentication, registration, and token management
 */

import { ApiClient } from '../apiClient';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config';

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  cusd_balance: string;
  balances: Record<string, string>;
  orders_count: number;
  active_orders_count: number;
  date_joined: string;
  last_login: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface RegisterData {
  username: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  password: string;
  password_confirm: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Authentication Service
 */
export class AuthService {
  /**
   * Register a new user
   */
  static async register(userData: RegisterData): Promise<AuthResponse | null> {
    const response = await ApiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
    
    if (response.data) {
      // Store token and user data
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
      return response.data;
    }
    
    return null;
  }
  
  /**
   * Login a user
   */
  static async login(loginData: LoginData): Promise<AuthResponse | null> {
    // Note: The API documentation doesn't explicitly show a login endpoint,
    // so we're assuming it's the same as register but with different fields
    const response = await ApiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, loginData);
    
    if (response.data) {
      // Store token and user data
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
      return response.data;
    }
    
    return null;
  }
  
  /**
   * Logout the current user
   */
  static logout(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }
  
  /**
   * Check if the user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
  
  /**
   * Get the current user
   */
  static getCurrentUser(): User | null {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }
  
  /**
   * Get the current auth token
   */
  static getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
  
  /**
   * Get user profile
   */
  static async getProfile(): Promise<User | null> {
    const response = await ApiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE, true);
    return response.data;
  }
  
  /**
   * Update user profile
   */
  static async updateProfile(userId: number, profileData: Partial<User>): Promise<User | null> {
    const response = await ApiClient.put<User>(
      `${API_ENDPOINTS.AUTH.UPDATE_PROFILE}${userId}/`,
      profileData,
      true
    );
    
    if (response.data) {
      // Update stored user data
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...response.data };
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      }
      return response.data;
    }
    
    return null;
  }
  
  /**
   * Update user balance
   */
  static async updateBalance(balanceData: { cusd_balance: string; balances: Record<string, string> }): Promise<User | null> {
    const response = await ApiClient.put<User>(
      API_ENDPOINTS.AUTH.UPDATE_BALANCE,
      balanceData,
      true
    );
    
    if (response.data) {
      // Update stored user data
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...response.data };
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      }
      return response.data;
    }
    
    return null;
  }
  
  /**
   * Get user stats
   */
  static async getUserStats(): Promise<any | null> {
    const response = await ApiClient.get(API_ENDPOINTS.AUTH.STATS, true);
    return response.data;
  }
}
