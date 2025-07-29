/**
 * Orderbook Service
 * Handles API requests for orderbook data
 */

import { ApiClient } from '../apiClient';
import { API_ENDPOINTS } from '../config';
import { Order } from './ordersService';

export interface OrderbookData {
  outcome: {
    id: number;
    name: string;
    description: string;
    event_name: string;
    total_orders: number;
  };
  orders: Order[];
}

/**
 * Orderbook Service
 */
export class OrderbookService {
  /**
   * Get orderbook for an outcome
   */
  static async getOrderbookForOutcome(outcomeId: number): Promise<OrderbookData | null> {
    const endpoint = `${API_ENDPOINTS.USER.ORDERBOOK}${outcomeId}/`;
    const response = await ApiClient.get<OrderbookData>(endpoint, true);
    return response.data;
  }

  /**
   * Get back orders for an outcome
   */
  static async getBackOrdersForOutcome(outcomeId: number): Promise<Order[]> {
    const orderbook = await this.getOrderbookForOutcome(outcomeId);
    return orderbook?.orders.filter(order => order.type === 'back') || [];
  }

  /**
   * Get lay orders for an outcome
   */
  static async getLayOrdersForOutcome(outcomeId: number): Promise<Order[]> {
    const orderbook = await this.getOrderbookForOutcome(outcomeId);
    return orderbook?.orders.filter(order => order.type === 'lay') || [];
  }
}
