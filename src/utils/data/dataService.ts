// Central data service for handling JSON data across the application
import eventsData from "./enhanced_events.json" with { type: "json" };
import pastEventsData from "./past_events.json" with { type: "json" };
import { dummyOrderBookData } from "./orderBookData";
import sections from "./sections";
import {
  Event,
  OrderBook,
  MarketTrendData,
  SearchItem,
  HomeData,
  CategoryData,
  SectionInfo,
  UIState,
  DataWithUIState
} from "./types";

// Cache for storing parsed data to improve performance
const dataCache: Record<string, any> = {};

// UI state tracking for data operations
const uiStateCache: Record<string, UIState> = {};

/**
 * Creates a default UI state object
 */
function createDefaultUIState(): UIState {
  return {
    loading: false,
    error: null,
    lastUpdated: null
  };
}

/**
 * Gets the current UI state for a specific data key
 */
export function getUIState(dataKey: string): UIState {
  if (!uiStateCache[dataKey]) {
    uiStateCache[dataKey] = createDefaultUIState();
  }
  return uiStateCache[dataKey];
}

/**
 * Updates the UI state for a specific data key
 */
function updateUIState(dataKey: string, updates: Partial<UIState>): UIState {
  const currentState = getUIState(dataKey);
  uiStateCache[dataKey] = { ...currentState, ...updates };
  return uiStateCache[dataKey];
}

/**
 * Sets the loading state for a data key
 */
export function setLoading(dataKey: string, isLoading: boolean): void {
  updateUIState(dataKey, { loading: isLoading });
  if (!isLoading) {
    // When loading completes, update the lastUpdated timestamp
    updateUIState(dataKey, { lastUpdated: new Date().toISOString() });
  }
}

/**
 * Sets an error state for a data key
 */
export function setError(dataKey: string, error: string | null): void {
  updateUIState(dataKey, { error, loading: false });
}

/**
 * Wraps data with its UI state
 */
export function wrapWithUIState<T>(dataKey: string, data: T): DataWithUIState<T> {
  return {
    data,
    uiState: getUIState(dataKey)
  };
}

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
 * Validates an event object to ensure it has all required fields
 */
function isValidEvent(data: any): boolean {
  return (
    data &&
    typeof data.id === 'string' &&
    typeof data.title === 'string' &&
    typeof data.conditional === 'string' &&
    typeof data.probability === 'number' &&
    typeof data.totalVolume === 'string' &&
    typeof data.imageUrl === 'string'
  );
}

/**
 * Validates that an event has history data for graphs
 */
function hasValidHistoryData(event: Event): boolean {
  return Boolean(event?.historyData && event.historyData.length >= 2);
}

/**
 * Validates that an event belongs to a section
 */
function isEventInSection(event: Event | null, sectionId: string): boolean {
  // Null check to prevent 'event is possibly null' lint errors
  if (!event) return false;
  
  // Direct section match
  if (event.section === sectionId) {
    return true;
  }
  
  // Check if the event's category belongs to the section
  return false;
}

/**
 * Ensures an event has a slug for routing
 */
function ensureEventSlug(event: Event): Event {
  if (!event.slug) {
    // Create a slug from the title if not present
    const slug = event.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    return { ...event, slug };
  }
  return event;
}

/**
 * Event-related functions
 */

// Get all events
export function getAllEvents(): Event[] {
  const dataKey = 'events';
  
  if (!dataCache.events) {
    try {
      setLoading(dataKey, true);
      
      // Process events data to ensure all required fields are present
      const processedEvents = (eventsData as Event[]).map(event => {
        // Ensure event has a slug for routing
        const eventWithSlug = ensureEventSlug(event);
        
        // Add default section if missing
        if (!eventWithSlug.section) {
          eventWithSlug.section = "live"; // Default to live section
        }
        
        // Add empty history data if missing
        if (!eventWithSlug.historyData || eventWithSlug.historyData.length < 2) {
          eventWithSlug.historyData = [
            { date: "2024-01-01", probability: event.probability - 10 },
            { date: "2024-02-01", probability: event.probability - 5 },
            { date: "2024-03-01", probability: event.probability },
          ];
        }
        
        // Add status if missing
        if (!eventWithSlug.status) {
          eventWithSlug.status = "active";
        }
        
        // Add timestamps if missing
        if (!eventWithSlug.createdAt) {
          eventWithSlug.createdAt = new Date().toISOString();
        }
        
        if (!eventWithSlug.updatedAt) {
          eventWithSlug.updatedAt = new Date().toISOString();
        }
        
        // Add empty related events if missing
        if (!eventWithSlug.relatedEventIds) {
          eventWithSlug.relatedEventIds = [];
        }
        
        return eventWithSlug;
      });
      
      dataCache.events = processedEvents;
      setLoading(dataKey, false);
    } catch (error) {
      console.error("Error loading events data:", error);
      dataCache.events = [];
      setError(dataKey, error instanceof Error ? error.message : String(error));
    }
  }
  
  return dataCache.events;
}

// Get all events with UI state
export function getAllEventsWithUIState(): DataWithUIState<Event[]> {
  const dataKey = 'events';
  const events = getAllEvents();
  return wrapWithUIState(dataKey, events);
}

// Get a specific event by ID
export function getEventById(id: string): Event | null {
  const dataKey = `event-${id}`;
  setLoading(dataKey, true);
  
  try {
    const events = getAllEvents();
    const event = events.find(event => event.id === id) || null;
    
    if (!event) {
      console.warn(`Event with ID ${id} not found`);
      setError(dataKey, `Event with ID ${id} not found`);
      return null;
    }
    
    setLoading(dataKey, false);
    return event;
  } catch (error) {
    console.error(`Error retrieving event ${id}:`, error);
    setError(dataKey, error instanceof Error ? error.message : String(error));
    return null;
  }
}

// Get a specific event by ID with UI state
export function getEventByIdWithUIState(id: string): DataWithUIState<Event | null> {
  const dataKey = `event-${id}`;
  const event = getEventById(id);
  
  // Ensure we're not passing null directly to wrapWithUIState
  // This fixes the 'event is possibly null' lint errors
  return wrapWithUIState(dataKey, event || null);
}

// Get a specific event by slug
export function getEventBySlug(slug: string): Event | null {
  const dataKey = `event-slug-${slug}`;
  setLoading(dataKey, true);
  
  try {
    const events = getAllEvents();
    const event = events.find(event => event.slug === slug) || null;
    
    if (!event) {
      console.warn(`Event with slug ${slug} not found`);
      setError(dataKey, `Event with slug ${slug} not found`);
      return null;
    }
    
    setLoading(dataKey, false);
    return event;
  } catch (error) {
    console.error(`Error retrieving event with slug ${slug}:`, error);
    setError(dataKey, error instanceof Error ? error.message : String(error));
    return null;
  }
}

// Get a specific event by slug with UI state
export function getEventBySlugWithUIState(slug: string): DataWithUIState<Event | null> {
  const dataKey = `event-slug-${slug}`;
  const event = getEventBySlug(slug);
  // Ensure we're not passing null directly to wrapWithUIState
  // This fixes the 'event is possibly null' lint errors
  return wrapWithUIState(dataKey, event || null);
}

// Get events by category
export function getEventsByCategory(category: string): Event[] {
  const events = getAllEvents();
  // Add null check to prevent 'event is possibly null' lint errors
  return events.filter(event => event && event.category === category);
}

// Get events by section
export function getEventsBySection(sectionId: string): Event[] {
  const dataKey = `events_section_${sectionId}`;
  setLoading(dataKey, true);

  try {
    // Special handling for trending section
    if (sectionId === 'trending') {
      return getEventsByTrending();
    }
    
    const events = getAllEvents().filter(event => isEventInSection(event, sectionId));
    // Sort events: trending first, then new, then by probability
    const sortedEvents = [...events].sort((a, b) => {
      // First sort by trending
      if (a.isTrending && !b.isTrending) return -1;
      if (!a.isTrending && b.isTrending) return 1;
      
      // Then by new
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      
      // Then by probability (higher first)
      return b.probability - a.probability;
    });
    
    setLoading(dataKey, false);
    return sortedEvents;
  } catch (error) {
    console.error(`Error retrieving events for section ${sectionId}:`, error);
    setError(dataKey, error instanceof Error ? error.message : String(error));
    return [];
  }
}

// Get trending events (events with history data)
export function getEventsByTrending(): Event[] {
  const dataKey = 'events_trending';
  setLoading(dataKey, true);

  try {
    // Get events with history data, sorted by recent activity
    const events = getAllEvents()
      .filter(event => event.historyData && event.historyData.length > 0)
      .sort((a, b) => {
        // Sort by absolute probability change (most volatile first)
        const aChange = Math.abs(calculateProbabilityChangeValue(a));
        const bChange = Math.abs(calculateProbabilityChangeValue(b));
        return bChange - aChange;
      })
      .slice(0, 10); // Limit to top 10 trending events
    
    setLoading(dataKey, false);
    return events;
  } catch (error) {
    console.error('Error getting trending events:', error);
    setError(dataKey, error instanceof Error ? error.message : String(error));
    return [];
  }
}

// Helper function to calculate probability change as a number
function calculateProbabilityChangeValue(event: Event): number {
  if (!event.historyData || event.historyData.length === 0) return 0;
  
  const historyData = event.historyData;
  const latestProb = event.probability;
  const earliestProb = historyData[0].probability;
  return latestProb - earliestProb;
}

// Get events by section with UI state
export function getEventsBySectionWithUIState(sectionId: string): DataWithUIState<Event[]> {
  const dataKey = `events-section-${sectionId}`;
  const events = getEventsBySection(sectionId);
  return wrapWithUIState(dataKey, events);
}

// Get all sections
export function getAllSections(): SectionInfo[] {
  if (!dataCache.sections) {
    try {
      // Update section metadata with actual event counts
      const updatedSections = sections.map(section => {
        const sectionEvents = getEventsBySection(section.id);
        const validEvents = sectionEvents.filter(event => isValidEvent(event));
        
        // Find featured events for this section
        if (!section.featuredEventIds || section.featuredEventIds.length === 0) {
          // If no featured events are specified, use the first 3 valid events
          section.featuredEventIds = validEvents.slice(0, 3).map(event => event.id);
        }
        
        // Update metadata
        if (!section.metadata) {
          section.metadata = {};
        }
        
        section.metadata.totalEvents = validEvents.length;
        section.metadata.lastUpdated = new Date().toISOString();
        
        return section;
      });
      
      dataCache.sections = updatedSections;
    } catch (error) {
      console.error("Error processing sections data:", error);
      dataCache.sections = [];
    }
  }
  
  return dataCache.sections;
}

// Get section by ID
export function getSectionById(sectionId: string): SectionInfo | null {
  const sections = getAllSections();
  return sections.find(section => section.id === sectionId) || null;
}

// Get featured events for a section
export function getFeaturedEventsForSection(sectionId: string): Event[] {
  const section = getSectionById(sectionId);
  
  if (!section || !section.featuredEventIds || section.featuredEventIds.length === 0) {
    return [];
  }
  
  return section.featuredEventIds
    .map(id => getEventById(id))
    .filter((event): event is Event => event !== null && hasValidHistoryData(event));
}

// NOTE: searchEvents function has been removed in favor of the more comprehensive searchItems function

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
 * Related events functions
 */

// Get related events for an event
export function getRelatedEvents(eventId: string): Event[] {
  const event = getEventById(eventId);
  if (!event || !event.relatedEventIds || event.relatedEventIds.length === 0) {
    // If no related events are specified, find events in the same category or section
    const allEvents = getAllEvents();
    
    // If event is null, just return an empty array
    if (!event) {
      return [];
    }
    
    const sameCategory = allEvents.filter(e => 
      e && e.id !== eventId && 
      ((event.category && e.category === event.category) || 
       (event.section && e.section === event.section))
    );
    
    // Return up to 3 events from the same category/section
    return sameCategory.slice(0, 3);
  }
  
  return event.relatedEventIds
    .map(id => getEventById(id))
    .filter((event): event is Event => event !== null);
}

/**
 * Market trend related functions
 */

// Get market trend data for a specific market
export function getMarketTrend(marketId: string, optionId?: string): MarketTrendData {
  const dataKey = `market-trend-${marketId}${optionId ? `-${optionId}` : ''}`;
  setLoading(dataKey, true);
  
  try {
    // First check if we have real data for this market
    const allCategories = getHomeData().categories;
    
    for (const category of allCategories) {
      if (category.items.trends) {
        const trend = category.items.trends.find(t => t.id === marketId);
        if (trend) {
          setLoading(dataKey, false);
          return trend;
        }
      }
    }
    
    // If no real data found, check if this is an event ID and use its history data
    const event = getEventById(marketId);
    
    // If this is a multi-option bet and an optionId is provided, get the option's data
    if (event && optionId && event.options) {
      const option = event.options.find(opt => opt.id === optionId);
      
      if (option && option.historyData && option.historyData.length > 0) {
        const firstProbability = option.historyData[0]?.probability || 0;
        const change = option.probability - firstProbability;
        const changeStr = change >= 0 ? "+" + change.toFixed(1) : change.toFixed(1);
        
        const result: MarketTrendData = {
          id: optionId,
          title: option.title,
          probability: option.probability,
          probabilityChange: changeStr,
          history: [...option.historyData] // Create a copy to avoid reference issues
        };
        
        setLoading(dataKey, false);
        return result;
      }
    }
    
    // If this is a simple yes/no bet or no option was found, use the event's data
    if (event && event.historyData && event.historyData.length > 0) {
      const firstProbability = event.historyData[0]?.probability || 0;
      const change = event.probability - firstProbability;
      const changeStr = change >= 0 ? "+" + change.toFixed(1) : change.toFixed(1);
      
      const result: MarketTrendData = {
        id: marketId,
        title: event.title,
        probability: event.probability,
        probabilityChange: changeStr,
        history: [...event.historyData] // Create a copy to avoid reference issues
      };
      
      setLoading(dataKey, false);
      return result;
    }
    
    // If no real data found, return dummy data
    setLoading(dataKey, false);
  } catch (error) {
    console.error(`Error retrieving market trend for ${marketId}${optionId ? ` option ${optionId}` : ''}:`, error);
    setError(dataKey, error instanceof Error ? error.message : String(error));
  }
  
  // Return dummy data as fallback
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
  const dataKey = 'home';
  setLoading(dataKey, true);

  if (!dataCache.home) {
    try {
      // Create home data from the enhanced events
      const events = getAllEvents();
      
      // Helper function to determine display mode based on section ID
      const determinePreviewDisplayMode = (sectionId: string): 'slider' | 'grid' => {
        // Sections that work better with grid layout
        const gridSections = ['world', 'sports'];
        return gridSections.includes(sectionId) ? 'grid' : 'slider';
      };
      
      // Generate categories dynamically from sections config
      const categories: CategoryData[] = sections.map(section => {
        const sectionEvents = events.filter(event => {
          // For trending section, get events with history data
          if (section.id === 'trending') {
            return event.historyData && event.historyData.length > 0;
          }
          // For other sections, match by section ID
          return event.section === section.id;
        });
        
        // Prepare category data structure
        const categoryData: CategoryData = {
          id: section.id,
          title: section.name,
          items: {},
          metadata: {
            lastUpdated: new Date().toISOString(),
            totalItems: sectionEvents.length
          }
        };
        
        // Track which events have been displayed in specialized sections
        const displayedEventIds = new Set<string>();
        
        // Add trend items (events with history data) primarily for politics and finance sections
        if (['trending', 'politics', 'finance'].includes(section.id)) {
          const trendEvents = sectionEvents.filter(event => event.historyData && event.historyData.length > 0);
          if (trendEvents.length > 0) {
            const trendItems = trendEvents
              .slice(0, section.id === 'trending' ? 3 : 5) // Limit items
              .map(event => {
                // Track this event as displayed
                displayedEventIds.add(event.id);
                return {
                  type: 'trend',
                  id: event.id,
                  title: event.title,
                  probability: event.probability,
                  probabilityChange: calculateProbabilityChange(event),
                  image: event.imageUrl,
                  history: event.historyData || []
                };
              });
            
            if (trendItems.length > 0) {
              categoryData.items.trends = trendItems;
            }
          }
        }
        
        // Add multi-choice items (events with options) primarily for sports, economics, and crypto sections
        if (['sports', 'economics', 'crypto', 'world'].includes(section.id)) {
          const multiChoiceEvents = sectionEvents.filter(event => 
            event.options && event.options.length > 0 && !displayedEventIds.has(event.id)
          );
          
          if (multiChoiceEvents.length > 0) {
            const multiChoiceItems = multiChoiceEvents
              .slice(0, 5) // Limit items
              .map(event => {
                // Track this event as displayed
                displayedEventIds.add(event.id);
                return {
                  type: 'number',
                  id: event.id,
                  title: event.title,
                  totalVolume: event.totalVolume || 'N/A',
                  imageUrl: event.imageUrl,
                  options: event.options?.map(opt => ({
                    name: opt.title,
                    probability: opt.probability
                  })) || []
                };
              });
            
            if (multiChoiceItems.length > 0) {
              categoryData.items.multiChoice = multiChoiceItems;
            }
          }
        }
        
        // Add preview items for events that haven't been displayed in specialized sections
        const remainingEvents = sectionEvents.filter(event => !displayedEventIds.has(event.id));
        if (remainingEvents.length > 0) {
          categoryData.items.previews = {
            displayMode: determinePreviewDisplayMode(section.id),
            data: remainingEvents
              .slice(0, 6) // Limit preview items
              .map(event => ({
                id: event.id,
                title: event.title,
                probability: event.probability,
                imageUrl: event.imageUrl
              }))
          };
        }
        
        return categoryData;
      });
      
      // Filter out categories with no items to display
      const filteredCategories = categories.filter(category => {
        const items = category.items;
        return (
          (items.trends && items.trends.length > 0) ||
          (items.multiChoice && items.multiChoice.length > 0) ||
          (items.market && items.market.length > 0) ||
          (items.previews && items.previews.data.length > 0)
        );
      });
      
      dataCache.home = { 
        categories: filteredCategories,
        lastUpdated: new Date().toISOString()
      };
      setLoading(dataKey, false);
    } catch (error) {
      console.error("Error generating home data:", error);
      dataCache.home = { categories: [] };
      setError(dataKey, error instanceof Error ? error.message : String(error));
    }
  }
  
  return dataCache.home;
}

// Helper function to calculate probability change
function calculateProbabilityChange(event: Event): string {
  if (!event.historyData || event.historyData.length < 2) {
    return "+0";
  }
  
  const sortedHistory = [...event.historyData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const latest = sortedHistory[0].probability;
  const earliest = sortedHistory[sortedHistory.length - 1].probability;
  const change = latest - earliest;
  
  return change >= 0 ? `+${change.toFixed(1)}` : `${change.toFixed(1)}`;
}

// Get category data by ID
export function getCategoryById(categoryId: string): CategoryData | null {
  const home = getHomeData();
  return home.categories.find(cat => cat.id === categoryId) || null;
}

/**
 * Search related functions
 */

// Get all search items with improved caching and error handling
export function getAllSearchItems(): SearchItem[] {
  const dataKey = 'search-items';
  
  // Cache expiration settings
  const CACHE_TTL = 10 * 60 * 1000; // 10 minutes default TTL
  const FORCE_REFRESH_TTL = 30 * 60 * 1000; // 30 minutes force refresh
  
  // Get current time
  const now = new Date().getTime();
  
  // Get last updated timestamp
  const lastUpdated = uiStateCache[dataKey]?.lastUpdated ? 
    new Date(uiStateCache[dataKey].lastUpdated).getTime() : 0;
  
  // Calculate time since last update
  const timeSinceUpdate = now - lastUpdated;
  
  // Check if we need to refresh the cache
  const shouldRefreshCache = 
    // No cache exists
    !dataCache.search || !uiStateCache[dataKey] || 
    // Force refresh after FORCE_REFRESH_TTL
    timeSinceUpdate > FORCE_REFRESH_TTL || 
    // Normal refresh after CACHE_TTL if there was an error previously
    (timeSinceUpdate > CACHE_TTL && uiStateCache[dataKey]?.error)
  
  if (shouldRefreshCache) {
    setLoading(dataKey, true);
    
    try {
      // Generate search items from enhanced events data
      const events = getAllEvents();
      
      // Convert events to search items with null checking and enhanced information
      const eventSearchItems = events
        .filter(event => event) // Filter out null events
        .map(event => {
          // Extract tags from the event for better searchability
          const tags = event.tags || [];
          const description = event.description || '';
          
          return {
            id: event.id,
            name: event.title,
            kind: event.category || 'Event',
            image: event.imageUrl || '', // Ensure image is never undefined
            source: 'event',
            description: description.substring(0, 100), // Include a snippet of the description
            tags: tags.join(' '), // Include tags for search matching
            section: event.section || '',
            date: event.closingDate || event.createdAt || ''
          };
        });
      
      // Store in cache with timestamp
      dataCache.search = eventSearchItems;
      setLoading(dataKey, false);
      
      // Update last updated timestamp
      if (uiStateCache[dataKey]) {
        uiStateCache[dataKey].lastUpdated = new Date().toISOString();
      }
    } catch (error) {
      console.error("Error generating search data:", error);
      // Don't overwrite existing cache on error if it exists
      if (!dataCache.search) {
        dataCache.search = [];
      }
      setError(dataKey, error instanceof Error ? error.message : String(error));
    }
  }
  
  return dataCache.search || [];
}

// Search items by query with improved performance and relevance sorting
export function searchItems(query: string): SearchItem[] {
  if (!query) return [];
  
  const dataKey = `search-query-${query}`;
  setLoading(dataKey, true);
  
  try {
    const items = getAllSearchItems();
    const lowerQuery = query.toLowerCase().trim();
    
    // Early return for empty query
    if (!lowerQuery) {
      setLoading(dataKey, false);
      return [];
    }
    
    // Calculate relevance score for each item
    const scoredResults = items
      .map(item => {
        let score = 0;
        const name = item.name?.toLowerCase() || '';
        const kind = item.kind?.toLowerCase() || '';
        const description = (item as any).description?.toLowerCase() || '';
        const tags = (item as any).tags?.toLowerCase() || '';
        const section = (item as any).section?.toLowerCase() || '';
        
        // Exact matches get highest score
        if (name === lowerQuery) score += 100;
        if (kind === lowerQuery) score += 50;
        if (tags === lowerQuery) score += 40;
        
        // Starts with gets high score
        if (name.startsWith(lowerQuery)) score += 75;
        if (kind.startsWith(lowerQuery)) score += 35;
        if (tags.startsWith(lowerQuery)) score += 30;
        if (section.startsWith(lowerQuery)) score += 25;
        
        // Contains gets medium score
        if (name.includes(lowerQuery)) score += 50;
        if (description.includes(lowerQuery)) score += 40;
        if (kind.includes(lowerQuery)) score += 25;
        if (tags.includes(lowerQuery)) score += 20;
        if (section.includes(lowerQuery)) score += 15;
        
        // Word boundary matches get bonus points
        const nameWords = name.split(/\s+/);
        const descWords = description.split(/\s+/);
        const tagWords = tags.split(/\s+/);
        
        if (nameWords.some((word: string) => word === lowerQuery)) score += 30;
        if (descWords.some((word: string) => word === lowerQuery)) score += 25;
        if (tagWords.some((word: string) => word === lowerQuery)) score += 20;
        
        if (nameWords.some((word: string) => word.startsWith(lowerQuery))) score += 20;
        if (descWords.some((word: string) => word.startsWith(lowerQuery))) score += 15;
        if (tagWords.some((word: string) => word.startsWith(lowerQuery))) score += 15;
        
        return { item, score };
      })
      .filter(({ score }) => score > 0) // Only keep items with a score
      .sort((a, b) => b.score - a.score); // Sort by score descending
    
    // Extract just the items from the scored results
    const results = scoredResults.map(({ item }) => item);
    
    // Cache the results for this query
    if (results.length > 0) {
      // Store in cache with timestamp for potential future optimization
      if (!dataCache.searchQueries) {
        dataCache.searchQueries = {};
      }
      dataCache.searchQueries[lowerQuery] = {
        results,
        timestamp: new Date().getTime()
      };
    }
    
    setLoading(dataKey, false);
    return results;
  } catch (error) {
    console.error(`Error searching items for query: ${query}`, error);
    
    // Provide more specific error messages based on error type
    let errorMessage: string;
    
    if (error instanceof TypeError) {
      errorMessage = `Type error while searching: ${error.message}. Check data structure integrity.`;
    } else if (error instanceof ReferenceError) {
      errorMessage = `Reference error while searching: ${error.message}. This may indicate a missing dependency.`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    
    // Set the error in UI state
    setError(dataKey, errorMessage);
    
    // Recovery strategy: try to return cached results if available
    if (dataCache.searchQueries && dataCache.searchQueries[query.toLowerCase().trim()]) {
      console.log(`Recovering from error by using cached results for query: ${query}`);
      return dataCache.searchQueries[query.toLowerCase().trim()].results;
    }
    
    // If no cached results, return empty array
    return [];
  }
}

/**
 * Past events related functions
 */

/**
 * Get all past/resolved events
 */
export function getPastEvents(): Event[] {
  const cacheKey = 'past_events';
  
  if (dataCache[cacheKey]) {
    return dataCache[cacheKey];
  }
  
  try {
    // Type assertion since we know the structure matches the Event type
    const events = pastEventsData as unknown as Event[];
    
    // Process events for consistent data structure
    const processedEvents = events.map(event => ensureEventSlug(event));
    
    // Cache the processed events
    dataCache[cacheKey] = processedEvents;
    updateUIState(cacheKey, { loading: false, lastUpdated: new Date().toISOString() });
    
    return processedEvents;
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error loading past events';
    updateUIState(cacheKey, { loading: false, error });
    console.error('Error loading past events:', error);
    return [];
  }
}

/**
 * Get a specific past event by ID
 */
export function getPastEventById(id: string): Event | null {
  const cacheKey = `past_event_${id}`;
  
  if (dataCache[cacheKey]) {
    return dataCache[cacheKey];
  }
  
  try {
    const allPastEvents = getPastEvents();
    const event = allPastEvents.find(event => event.id === id) || null;
    
    dataCache[cacheKey] = event;
    updateUIState(cacheKey, { loading: false, lastUpdated: new Date().toISOString() });
    
    return event;
  } catch (err) {
    const error = err instanceof Error ? err.message : `Unknown error loading past event ${id}`;
    updateUIState(cacheKey, { loading: false, error });
    console.error(`Error loading past event ${id}:`, error);
    return null;
  }
}

/**
 * Get past events with UI state
 */
export function getPastEventsWithUIState(): DataWithUIState<Event[]> {
  return wrapWithUIState('past_events', getPastEvents());
}

/**
 * End of data service functions
 */
