/**
 * API Hooks
 * Custom hooks for using the API services in components
 */

'use client';

import { useState, useEffect } from 'react';
import { 
  HomepageService, 
  CategoriesService, 
  EventsService,
  OrdersService,
  OrderbookService,
  useAuth
} from '../index';

interface UseApiOptions {
  initialLoading?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Generic hook for fetching data from the API
 */
function useApiCall<T>(
  fetchFn: () => Promise<T>,
  options: UseApiOptions = {}
): ApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(options.initialLoading ?? true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching homepage data
 */
export function useHomepage(options: UseApiOptions = {}) {
  return useApiCall(() => HomepageService.getHomepageData(), options);
}

/**
 * Hook for fetching categories
 */
export function useCategories(options: UseApiOptions = {}) {
  return useApiCall(() => CategoriesService.getAllCategories(), options);
}

/**
 * Hook for fetching subcategories by category ID
 */
export function useSubcategories(categoryId: number, options: UseApiOptions = {}) {
  return useApiCall(() => CategoriesService.getSubcategoriesByCategoryId(categoryId), options);
}

/**
 * Hook for fetching events
 */
export function useEvents(filters = {}, options: UseApiOptions = {}) {
  return useApiCall(() => EventsService.getAllEvents(filters), options);
}

/**
 * Hook for fetching a single event by ID
 */
export function useEvent(eventId: number, options: UseApiOptions = {}) {
  return useApiCall(() => EventsService.getEventById(eventId), options);
}

/**
 * Hook for fetching outcomes for an event
 */
export function useOutcomes(eventId: number, options: UseApiOptions = {}) {
  return useApiCall(() => EventsService.getOutcomesByEventId(eventId), options);
}

/**
 * Hook for fetching user orders (requires authentication)
 */
export function useUserOrders(options: UseApiOptions = {}) {
  const { isAuthenticated } = useAuth();
  
  return useApiCall(
    async () => {
      if (!isAuthenticated) {
        throw new Error('Authentication required');
      }
      return OrdersService.getUserOrders();
    },
    options
  );
}

/**
 * Hook for fetching orderbook for an outcome (requires authentication)
 */
export function useOrderbook(outcomeId: number, options: UseApiOptions = {}) {
  const { isAuthenticated } = useAuth();
  
  return useApiCall(
    async () => {
      if (!isAuthenticated) {
        throw new Error('Authentication required');
      }
      return OrderbookService.getOrderbookForOutcome(outcomeId);
    },
    options
  );
}
