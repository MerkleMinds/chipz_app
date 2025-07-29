/**
 * Orders Service
 * Handles API requests for user orders and order management
 */

import { ApiClient } from '../apiClient';
import { API_ENDPOINTS } from '../config';

export interface Order {
  id: number;
  user: number;
  outcome: number;
  outcome_name: string;
  event_name: string;
  type: "back" | "lay";
  amount: string;
  price: string;
  potential_profit: string;
  status: "pending" | "active" | "completed" | "cancelled" | "closed";
  started_timestamp: string;
  completed_timestamp: string | null;
}

export interface NewOrderData {
  outcome: number;
  type: "back" | "lay";
  amount: string;
  price: string;
}

/**
 * Orders Service
 */
export class OrdersService {
  /**
   * Get user orders
   */
  static async getUserOrders(): Promise<Order[]> {
    const response = await ApiClient.get<Order[]>(API_ENDPOINTS.USER.ORDERS, true);
    return response.data || [];
  }

  /**
   * Place a new order
   */
  static async placeOrder(orderData: NewOrderData): Promise<Order | null> {
    const response = await ApiClient.post<Order>(
      API_ENDPOINTS.USER.ORDER_MANAGEMENT,
      orderData,
      true
    );
    return response.data;
  }

  /**
   * Cancel an order
   */
  static async cancelOrder(orderId: number): Promise<boolean> {
    const endpoint = `${API_ENDPOINTS.USER.ORDER_MANAGEMENT}${orderId}/cancel/`;
    const response = await ApiClient.post<any>(endpoint, {}, true);
    return !!response.data;
  }

  /**
   * Close an order
   */
  static async closeOrder(orderId: number): Promise<boolean> {
    const endpoint = `${API_ENDPOINTS.USER.ORDER_MANAGEMENT}${orderId}/close/`;
    const response = await ApiClient.post<any>(endpoint, {}, true);
    return !!response.data;
  }

  /**
   * Get order by ID
   */
  static async getOrderById(orderId: number): Promise<Order | null> {
    const orders = await this.getUserOrders();
    return orders.find(order => order.id === orderId) || null;
  }
}
