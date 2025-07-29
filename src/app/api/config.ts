export const API_CONFIG = {
  BASE_URL: 'http://localhost:8001/api/v1',
  TIMEOUT: 10000, // 10 seconds
};

export const API_ENDPOINTS = {
  // Public endpoints
  PUBLIC: {
    CATEGORIES: '/core/public/categories/',
    SUBCATEGORIES: '/core/public/subcategories/',
    EVENTS: '/core/public/events/',
    OUTCOMES: '/core/public/outcomes/',
    HOMEPAGE: '/core/public/homepage/',
  },
  
  // Auth endpoints
  AUTH: {
    REGISTER: '/users/register/',
    PROFILE: '/users/profile/',
    UPDATE_PROFILE: '/users/profile/',
    UPDATE_BALANCE: '/users/profile/update_balance/',
    STATS: '/users/stats/',
  },
  
  // User endpoints (require authentication)
  USER: {
    ORDERS: '/core/user/orders/',
    ORDER_MANAGEMENT: '/core/user/order-management/',
    ORDERBOOK: '/core/user/orderbook/',
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'chipz_auth_token',
  USER_DATA: 'chipz_user_data',
};
