/**
 * API Index
 * Exports all API services for easy access
 */

// Core API client
export { ApiClient } from './apiClient';
export { API_CONFIG, API_ENDPOINTS, STORAGE_KEYS } from './config';

// Auth services
export { AuthService } from './auth/authService';
export { AuthProvider, useAuth } from './auth/AuthContext';
export type { 
  User, 
  AuthResponse, 
  RegisterData, 
  LoginData, 
  AuthState 
} from './auth/authService';

// Public services
export { CategoriesService } from './public/categoriesService';
export type { 
  Category, 
  Subcategory 
} from './public/categoriesService';

export { EventsService } from './public/eventsService';
export type { 
  Event, 
  Outcome, 
  EventsFilter 
} from './public/eventsService';

export { HomepageService } from './public/homepageService';
export type { 
  TrendingEvent, 
  FeaturedCategory, 
  HomepageData 
} from './public/homepageService';

// User services
export { OrdersService } from './user/ordersService';
export type { 
  Order, 
  NewOrderData 
} from './user/ordersService';

export { OrderbookService } from './user/orderbookService';
export type { 
  OrderbookData 
} from './user/orderbookService';
