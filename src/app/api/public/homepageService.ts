import { ApiClient } from '../apiClient';
import { API_ENDPOINTS } from '../config';
import { Category } from './categoriesService';
import { Event } from './eventsService';

export interface TrendingEvent {
  id: number;
  name: string;
  description: string;
  category_name: string;
  start_date: string;
  end_date: string;
  outcomes_count: number;
}

export interface FeaturedCategory {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  events_count: number;
}

export interface HomepageData {
  trending_events: TrendingEvent[];
  featured_categories: FeaturedCategory[];
}

/**
 * Homepage Service
 */
export class HomepageService {
  /**
   * Get homepage data
   */
  static async getHomepageData(): Promise<HomepageData> {
    const response = await ApiClient.get<HomepageData>(API_ENDPOINTS.PUBLIC.HOMEPAGE);
    return response.data || { trending_events: [], featured_categories: [] };
  }

  /**
   * Get trending events
   */
  static async getTrendingEvents(): Promise<TrendingEvent[]> {
    const homepageData = await this.getHomepageData();
    return homepageData.trending_events || [];
  }

  /**
   * Get featured categories
   */
  static async getFeaturedCategories(): Promise<FeaturedCategory[]> {
    const homepageData = await this.getHomepageData();
    return homepageData.featured_categories || [];
  }
}
