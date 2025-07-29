/**
 * Events Service
 * Handles API requests for events and outcomes
 */

import { ApiClient } from '../apiClient';
import { API_ENDPOINTS } from '../config';

export interface Event {
  id: number;
  name: string;
  description: string;
  subcategory: number;
  subcategory_name: string;
  category_name: string;
  type: "multi-outcome" | "single-outcome";
  start_date: string;
  end_date: string;
  outcomes_count: number;
  created_at: string;
  updated_at: string;
}

export interface Outcome {
  id: number;
  event: number;
  event_name: string;
  name: string;
  description: string;
  total_orders: number;
  created_timestamp: string;
  updated_timestamp: string;
}

export interface EventsFilter {
  category_id?: number;
  subcategory_id?: number;
}

/**
 * Events Service
 */
export class EventsService {
  /**
   * Get all events
   */
  static async getAllEvents(filters: EventsFilter = {}): Promise<Event[]> {
    // Build query string from filters
    const params = new URLSearchParams();
    if (filters.category_id) {
      params.append('category_id', filters.category_id.toString());
    }
    if (filters.subcategory_id) {
      params.append('subcategory_id', filters.subcategory_id.toString());
    }
    
    const queryString = params.toString();
    const endpoint = queryString 
      ? `${API_ENDPOINTS.PUBLIC.EVENTS}?${queryString}`
      : API_ENDPOINTS.PUBLIC.EVENTS;
    
    const response = await ApiClient.get<Event[]>(endpoint);
    return response.data || [];
  }

  /**
   * Get event by ID
   */
  static async getEventById(eventId: number): Promise<Event | null> {
    const events = await this.getAllEvents();
    return events.find(event => event.id === eventId) || null;
  }

  /**
   * Get events by category ID
   */
  static async getEventsByCategoryId(categoryId: number): Promise<Event[]> {
    return this.getAllEvents({ category_id: categoryId });
  }

  /**
   * Get events by subcategory ID
   */
  static async getEventsBySubcategoryId(subcategoryId: number): Promise<Event[]> {
    return this.getAllEvents({ subcategory_id: subcategoryId });
  }

  /**
   * Get outcomes for an event
   */
  static async getOutcomesByEventId(eventId: number): Promise<Outcome[]> {
    const endpoint = `${API_ENDPOINTS.PUBLIC.OUTCOMES}?event_id=${eventId}`;
    const response = await ApiClient.get<Outcome[]>(endpoint);
    return response.data || [];
  }

  /**
   * Get outcome by ID
   */
  static async getOutcomeById(outcomeId: number): Promise<Outcome | null> {
    // Since there's no direct endpoint for getting an outcome by ID,
    // we would need to implement a more complex solution in a real app.
    // For now, we'll return null as a placeholder.
    return null;
  }
}
