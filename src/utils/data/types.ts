// Centralized type definitions for the application
// This file contains all shared types used across the application

import { ReactElement } from "react";

// UI State types
export interface UIState {
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface DataWithUIState<T> {
  data: T;
  uiState: UIState;
}

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
  slug?: string;                 // URL-friendly version of title for routing
  conditional: string;
  description?: string;          // Detailed description
  category?: string;             // Primary category (politics, sports, etc.)
  subcategory?: string;          // Optional subcategory
  tags?: string[];               // Array of tags for filtering
  probability: number;
  totalVolume: string;
  imageUrl: string;
  status?: "active" | "closed" | "upcoming"; // Event status
  isNew?: boolean;               // Flag for new events
  isTrending?: boolean;          // Flag for trending events
  createdAt?: string;            // ISO date string
  updatedAt?: string;            // ISO date string
  closingDate?: string;          // When the event resolves
  section?: string;              // Which section this belongs to (must match a section ID)
  relatedEventIds?: string[];    // IDs of related events
  historyData?: MarketHistory[]; // Historical data for graph
  orderBook?: any[];             // OrderBook data for the event
  options?: EventOption[];
}

export interface EventOption {
  id?: string;                   // Unique identifier for the option
  title: string;
  probability: number;
  description?: string;          // Optional description
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
  isNew?: boolean;               // Flag for new items
  isTrending?: boolean;          // Flag for trending items
  section?: string;              // Which section this belongs to
  category?: string;             // Category for filtering
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
  lastUpdated?: string;          // When the data was last updated
}

export interface CategoryData {
  id?: string;
  title: string;
  description?: string;          // Category description
  items: {
    trends?: MarketTrendData[];
    multiChoice?: MarketNbrItem[];
    previews?: {
      displayMode?: 'slider' | 'grid' | string;
      data: PredictionPreviewItem[];
    };
    market?: MarketItem[];
  };
  metadata?: {
    totalItems: number;          // Number of items in this category
    lastUpdated: string;         // When category was last updated
  };
}

// Section types
export interface SectionInfo {
  id: string;                    // Unique identifier (live, politics, sports, etc.)
  name: string;                  // Display name
  icon: ReactElement;            // Icon reference
  path: string;                  // URL path
  description?: string;          // Optional description
  featuredEventIds?: string[];   // IDs of events to feature in this section
  filters?: SectionFilter[];     // Available filters for this section
  metadata?: {
    lastUpdated?: string;        // ISO date string
    totalEvents?: number;        // Count of events in this section
  };
}

export interface SectionFilter {
  id: string;                    // Filter identifier
  name: string;                  // Display name
  options: {
    id: string;
    name: string;
  }[];
}
