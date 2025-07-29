import { ApiClient } from '../apiClient';
import { API_ENDPOINTS } from '../config';

export interface Category {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  events_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Subcategory {
  id: number;
  name: string;
  description: string;
  category: number;
  category_name: string;
  events_count?: number;
  created_at: string;
  updated_at: string;
}

/**
 * Categories Service
 */
export class CategoriesService {
  /**
   * Get all categories
   */
  static async getAllCategories(): Promise<Category[]> {
    const response = await ApiClient.get<Category[]>(API_ENDPOINTS.PUBLIC.CATEGORIES);
    return response.data || [];
  }

  /**
   * Get category by ID
   */
  static async getCategoryById(categoryId: number): Promise<Category | null> {
    const categories = await this.getAllCategories();
    return categories.find(category => category.id === categoryId) || null;
  }

  /**
   * Get all subcategories
   */
  static async getAllSubcategories(): Promise<Subcategory[]> {
    const response = await ApiClient.get<Subcategory[]>(API_ENDPOINTS.PUBLIC.SUBCATEGORIES);
    return response.data || [];
  }

  /**
   * Get subcategories by category ID
   */
  static async getSubcategoriesByCategoryId(categoryId: number): Promise<Subcategory[]> {
    const endpoint = `${API_ENDPOINTS.PUBLIC.SUBCATEGORIES}?category_id=${categoryId}`;
    const response = await ApiClient.get<Subcategory[]>(endpoint);
    return response.data || [];
  }

  /**
   * Get subcategory by ID
   */
  static async getSubcategoryById(subcategoryId: number): Promise<Subcategory | null> {
    const subcategories = await this.getAllSubcategories();
    return subcategories.find(subcategory => subcategory.id === subcategoryId) || null;
  }
}
