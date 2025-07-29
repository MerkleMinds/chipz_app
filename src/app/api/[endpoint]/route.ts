/**
 * API Route Handler
 * Serves as a bridge between our new API services and the existing frontend
 */

import { NextRequest, NextResponse } from "next/server";
import { 
  HomepageService, 
  CategoriesService,
  EventsService
} from "../index";
import sections from "@/utils/data/sections";
import { SectionData } from "@/components/SectionContent";

/**
 * Handle GET requests to the API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { endpoint: string } }
) {
  try {
    const endpoint = params.endpoint.toLowerCase();
    
    // Validate endpoint name to prevent security issues
    if (!/^[a-z]+$/.test(endpoint)) {
      console.log(`API: Invalid endpoint name: ${endpoint}`);
      return NextResponse.json(
        { error: "Invalid endpoint name" },
        { status: 400 }
      );
    }
    
    // Route the request based on the endpoint
    switch (endpoint) {
      case 'home':
        return await handleHomeRequest();
      case 'section':
        return await handleSectionRequest(request);
      default:
        console.log(`API: Endpoint not found: ${endpoint}`);
        return NextResponse.json(
          { error: "Endpoint not found" },
          { status: 404 }
        );
    }
  } catch (error) {
    console.error(`API Error:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Handle requests to the home endpoint
 */
async function handleHomeRequest() {
  try {
    // Get homepage data from the API
    const homepageData = await HomepageService.getHomepageData();
    
    // Get all categories
    const categories = await CategoriesService.getAllCategories();
    
    // Transform the data to match the expected format
    const transformedData = {
      categories: sections.map(section => {
        // Find matching category
        const category = categories.find(cat => cat.name.toLowerCase() === section.name.toLowerCase());
        
        // Get trending events for this category
        const trendingEvents = homepageData.trending_events.filter(
          event => event.category_name.toLowerCase() === section.name.toLowerCase()
        );
        
        return {
          title: section.name,
          items: {
            // For events with options (multi-choice markets)
            multiChoice: trendingEvents
              .filter(event => event.outcomes_count > 1)
              .slice(0, 5)
              .map(event => ({
                type: "number",
                id: event.id.toString(),
                title: event.name,
                totalVolume: "N/A", // API doesn't provide this yet
                imageUrl: category?.icon_url || "",
                options: [] // We'll need to fetch outcomes separately
              })),
            
            // For binary events (yes/no markets)
            trends: trendingEvents
              .filter(event => event.outcomes_count <= 1)
              .slice(0, 5)
              .map(event => ({
                type: "trend",
                id: event.id.toString(),
                title: event.name,
                probability: 0.5, // Default value
                probabilityChange: "+0.0", // Default value
                image: category?.icon_url || "",
                history: [] // We'll need historical data
              }))
          }
        };
      })
    };
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error in handleHomeRequest:", error);
    throw error;
  }
}

/**
 * Handle requests to the section endpoint
 */
async function handleSectionRequest(request: NextRequest) {
  try {
    // Get section parameter from query string
    const url = new URL(request.url);
    const sectionParam = url.searchParams.get('section');
    
    if (!sectionParam) {
      return NextResponse.json(
        { error: "Section parameter is required" },
        { status: 400 }
      );
    }
    
    // Find the section metadata
    const sectionMeta = sections.find(
      s => s.name.toLowerCase() === sectionParam.toLowerCase() || s.id === sectionParam
    );
    
    if (!sectionMeta) {
      return NextResponse.json(
        { error: "Section not found" },
        { status: 404 }
      );
    }
    
    // Get events for this category
    const events = await EventsService.getAllEvents();
    const categoryEvents = events.filter(
      event => event.category_name.toLowerCase() === sectionMeta.name.toLowerCase()
    );
    
    // Transform the data to match the expected format
    const sectionData: SectionData = {
      categories: [
        {
          title: sectionMeta.name,
          items: {
            // For events with options (multi-choice markets)
            multiChoice: await Promise.all(
              categoryEvents
                .filter(event => event.type === "multi-outcome")
                .map(async event => {
                  // Get outcomes for this event
                  const outcomes = await EventsService.getOutcomesByEventId(event.id);
                  
                  return {
                    type: "number",
                    id: event.id.toString(),
                    title: event.name,
                    totalVolume: "N/A", // API doesn't provide this yet
                    imageUrl: "", // API doesn't provide this yet
                    options: outcomes.map(outcome => ({
                      name: outcome.name,
                      probability: 0.5 // Default value
                    }))
                  };
                })
            ),
            
            // For binary events (yes/no markets)
            trends: categoryEvents
              .filter(event => event.type === "single-outcome")
              .map(event => ({
                type: "trend",
                id: event.id.toString(),
                title: event.name,
                probability: 0.5, // Default value
                probabilityChange: "+0.0", // Default value
                image: "", // API doesn't provide this yet
                history: [] // We'll need historical data
              }))
          }
        }
      ]
    };
    
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error("Error in handleSectionRequest:", error);
    throw error;
  }
}
