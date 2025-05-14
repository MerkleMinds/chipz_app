// Central data service for handling JSON data across the application
import eventsData from "./events.json" with { type: "json" };
import homeData from "./sections/home.json" with { type: "json" };
import searchData from "./searchData.json" with { type: "json" };
import { dummyOrderBookData } from "./orderBookData";
import {
  Event,
  EventOption,
  OrderBook,
  MarketHistory,
  MarketTrendData,
  MarketItem,
  MarketNbrItem,
  PredictionPreviewItem,
  SearchItem,
  HomeData,
  CategoryData
} from "./types";

// Cache for storing parsed data to improve performance
const dataCache: Record<string, any> = {};

/**
 * Data validation helper functions
 */
function isValidOrderBook(data: any): boolean {
  return (
    data &&
    data.yes && 
    data.yes.lastPrice && 
    Array.isArray(data.yes.asks) && 
    Array.isArray(data.yes.bids) &&
    data.no && 
    data.no.lastPrice && 
    Array.isArray(data.no.asks) && 
    Array.isArray(data.no.bids)
  );
}

/**
 * Event-related functions
 */

// Get all events
export function getAllEvents(): Event[] {
  if (!dataCache.events) {
    try {
      dataCache.events = eventsData;
    } catch (error) {
      console.error("Error loading events data:", error);
      dataCache.events = [];
    }
  }
  return dataCache.events;
}

// Get a specific event by ID
export function getEventById(id: string): Event | null {
  const events = getAllEvents();
  return events.find(event => event.id === id) || null;
}

// Get events by category
export function getEventsByCategory(category: string): Event[] {
  // This is a placeholder - in a real app, events would have categories
  // For now, we'll just return all events
  return getAllEvents();
}

// Search events by title
export function searchEvents(query: string): Event[] {
  if (!query) return [];
  
  const events = getAllEvents();
  const lowerQuery = query.toLowerCase();
  
  return events.filter(event => 
    event.title.toLowerCase().includes(lowerQuery)
  );
}

/**
 * OrderBook-related functions
 */

// Get OrderBook data for a specific event
export function getOrderBookForEvent(eventId: string): OrderBook {
  const event = getEventById(eventId);
  
  if (event?.orderBook && event.orderBook.length > 0) {
    try {
      const orderBookData = event.orderBook[0];
      if (isValidOrderBook(orderBookData)) {
        return orderBookData as OrderBook;
      }
    } catch (error) {
      console.error("Error parsing orderBook data:", error);
    }
  }
  
  // Return dummy data if no valid data found
  return dummyOrderBookData;
}

// Get OrderBook data for a specific option in an event
export function getOrderBookForOption(eventId: string, optionTitle: string): OrderBook {
  const event = getEventById(eventId);
  
  if (event?.options) {
    const option = event.options.find(opt => opt.title === optionTitle);
    if (option?.orderBook && option.orderBook.length > 0) {
      try {
        const orderBookData = option.orderBook[0];
        if (isValidOrderBook(orderBookData)) {
          return orderBookData as OrderBook;
        }
      } catch (error) {
        console.error("Error parsing option orderBook data:", error);
      }
    }
  }
  
  // Return dummy data if no valid data found
  return dummyOrderBookData;
}

/**
 * Market trend related functions
 */

// Get market trend data for a specific market
export function getMarketTrend(marketId: string): MarketTrendData {
  // First check if we have real data for this market
  const allCategories = getHomeData().categories;
  
  for (const category of allCategories) {
    if (category.items.trends) {
      const trend = category.items.trends.find(t => t.id === marketId);
      if (trend) return trend;
    }
  }
  
  // If no real data found, return dummy data
  return {
    id: marketId,
    probabilityChange: "+5.2",
    history: [
      { date: "2024-01-01", probability: 45 },
      { date: "2024-01-02", probability: 50 },
      { date: "2024-01-03", probability: 55 },
      { date: "2024-01-04", probability: 60 },
      { date: "2024-01-05", probability: 65 },
      { date: "2024-01-06", probability: 70 },
      { date: "2024-01-07", probability: 75 },
      { date: "2024-01-08", probability: 80 },
    ]
  };
}

/**
 * Home page data functions
 */

// Get home page data
export function getHomeData(): HomeData {
  if (!dataCache.home) {
    try {
      dataCache.home = homeData;
    } catch (error) {
      console.error("Error loading home data:", error);
      dataCache.home = { categories: [] };
    }
  }
  return dataCache.home;
}

// Get category data by ID
export function getCategoryById(categoryId: string): CategoryData | null {
  const home = getHomeData();
  return home.categories.find(cat => cat.id === categoryId) || null;
}

/**
 * Search related functions
 */

// Get all search items
export function getAllSearchItems(): SearchItem[] {
  if (!dataCache.search) {
    try {
      dataCache.search = searchData;
    } catch (error) {
      console.error("Error loading search data:", error);
      dataCache.search = [];
    }
  }
  return dataCache.search;
}

// Search items by query
export function searchItems(query: string): SearchItem[] {
  if (!query) return [];
  
  const items = getAllSearchItems();
  const lowerQuery = query.toLowerCase();
  
  return items.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.kind.toLowerCase().includes(lowerQuery)
  );
}

// Get search items by source type
export function getSearchItemsBySource(source: string): SearchItem[] {
  const items = getAllSearchItems();
  return items.filter(item => item.source === source);
}

/**
 * Utility functions for data transformation
 */

// Convert Event to PredictionPreviewItem
export function eventToPredictionPreview(event: Event): PredictionPreviewItem {
  return {
    id: event.id,
    title: event.title,
    probability: event.probability,
    imageUrl: event.imageUrl
  };
}

// Convert Event to MarketItem
export function eventToMarketItem(event: Event): MarketItem {
  return {
    id: event.id,
    title: event.title,
    probability: event.probability,
    totalVolume: event.totalVolume,
    imageUrl: event.imageUrl
  };
}

// Get all prediction previews
export function getAllPredictionPreviews(): PredictionPreviewItem[] {
  return getAllEvents().map(eventToPredictionPreview);
}

// Get all market items
export function getAllMarketItems(): MarketItem[] {
  return getAllEvents().map(eventToMarketItem);
}
