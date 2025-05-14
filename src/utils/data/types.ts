// Centralized type definitions for the application
// This file contains all shared types used across the application

// Basic types
export interface Order {
  price: string;
  shares: number;
  total: string;
  volume: number;
}

export interface OrderBookSide {
  lastPrice: string;
  spread: string;
  asks: Order[];
  bids: Order[];
}

export interface OrderBook {
  yes: OrderBookSide;
  no: OrderBookSide;
}

// Event types
export interface Event {
  id: string;
  title: string;
  conditional: string;
  probability: number;
  totalVolume: string;
  imageUrl: string;
  orderBook?: any[]; // OrderBook data for the event
  options?: EventOption[];
}

export interface EventOption {
  title: string;
  probability: number;
  orderBook?: any[];
}

// Market types
export interface MarketItem {
  id: string;
  title: string;
  probability: number;
  totalVolume: string;
  imageUrl: string;
}

export interface MarketNbrItem {
  type: string;
  id: string;
  title: string;
  totalVolume: string;
  imageUrl: string;
  options: {
    name: string;
    probability: number;
  }[];
}

export interface MarketHistory {
  date: string;
  probability: number;
}

export interface MarketTrendData {
  type?: string;
  id: string;
  title?: string;
  probability?: number;
  probabilityChange: string;
  image?: string;
  history: MarketHistory[];
}

// Preview types
export interface PredictionPreviewItem {
  id: string;
  title: string;
  probability: number;
  imageUrl: string;
}

// Search types
export interface SearchItem {
  id: string;
  name: string;
  kind: string;
  image: string;
  source: string;
}

// Home page data structure
export interface HomeData {
  categories: CategoryData[];
}

export interface CategoryData {
  id?: string;
  title: string;
  items: {
    trends?: MarketTrendData[];
    multiChoice?: MarketNbrItem[];
    previews?: {
      displayMode?: 'slider' | 'grid' | string;
      data: PredictionPreviewItem[];
    };
    market?: MarketItem[];
  };
}
