import { API_CONFIG, STORAGE_KEYS } from './config';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export class ApiClient {
  static async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      requiresAuth = false,
    } = options;

    try {
      // Set up headers
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
      };

      // Add auth token if required
      if (requiresAuth) {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (!token) {
          return {
            data: null,
            error: 'Authentication required',
            status: 401,
          };
        }
        requestHeaders['Authorization'] = `Token ${token}`;
      }

      // Set up request options
      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
        credentials: 'include',
      };

      // Add body if provided
      if (body) {
        requestOptions.body = JSON.stringify(body);
      }

      // Make request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      requestOptions.signal = controller.signal;

      // Make the request
      const url = `${API_CONFIG.BASE_URL}${endpoint}`;
      const response = await fetch(url, requestOptions);
      clearTimeout(timeoutId);

      // Parse response
      let data = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      }

      // Handle success
      if (response.ok) {
        return {
          data,
          error: null,
          status: response.status,
        };
      }

      // Handle error
      return {
        data: null,
        error: data?.error || response.statusText || 'Unknown error',
        status: response.status,
      };
    } catch (error) {
      // Handle network errors
      const isAbortError = error instanceof DOMException && error.name === 'AbortError';
      
      return {
        data: null,
        error: isAbortError ? 'Request timeout' : (error as Error).message || 'Network error',
        status: isAbortError ? 408 : 0,
      };
    }
  }

  static async get<T>(endpoint: string, requiresAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', requiresAuth });
  }

  static async post<T>(endpoint: string, body: any, requiresAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body, requiresAuth });
  }

  static async put<T>(endpoint: string, body: any, requiresAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body, requiresAuth });
  }

  static async delete<T>(endpoint: string, requiresAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', requiresAuth });
  }
}
