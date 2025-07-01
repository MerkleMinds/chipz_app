import { NextRequest, NextResponse } from "next/server";
import eventsData from "@/utils/data/enhanced_events.json" with { type: "json" };
import sections from "@/utils/data/sections";
import { HomeData } from "@/utils/data/types";

export function GET(_request: NextRequest) {
    // Convert the eventsData to the expected HomeData format
    const events = eventsData as any[];
    
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
    
    // Group events by section
    const eventsBySection = sections.reduce((acc, section) => {
        const sectionId = section.id;
        acc[sectionId] = sortedEvents.filter(event => event.section === sectionId);
        return acc;
    }, {} as Record<string, any[]>);
    
    // Create the home data structure
    const homeData: HomeData = {
        categories: sections.map(section => {
            const sectionEvents = eventsBySection[section.id] || [];
            return {
                title: section.name,
                // icon is optional, so we can omit it in server components
                items: {
                    // For events with options (multi-choice markets)
                    multiChoice: sectionEvents
                        .filter(event => event.options && event.options.length > 0)
                        .slice(0, 5) // Limit to 5 events per section
                        .map(event => ({
                            type: "number",
                            id: event.id,
                            title: event.title,
                            totalVolume: event.totalVolume || "N/A",
                            imageUrl: event.imageUrl,
                            options: event.options?.map((opt: any) => ({
                                name: opt.title,
                                probability: opt.probability
                            })) || []
                        })),
                    
                    // For binary events (yes/no markets)
                    trends: sectionEvents
                        .filter(event => !event.options && event.historyData && event.historyData.length > 0)
                        .slice(0, 5) // Limit to 5 events per section
                        .map(event => {
                            // Calculate probability change
                            const historyData = event.historyData || [];
                            const latestProb = event.probability;
                            const earliestProb = historyData.length > 0 ? historyData[0].probability : latestProb;
                            const change = latestProb - earliestProb;
                            const probChange = change >= 0 ? `+${change.toFixed(1)}` : `${change.toFixed(1)}`;
                            
                            return {
                                type: "trend",
                                id: event.id,
                                title: event.title,
                                probability: event.probability,
                                probabilityChange: probChange,
                                image: event.imageUrl,
                                history: event.historyData || []
                            };
                        })
                }
            };
        })
    };
    
    return NextResponse.json(homeData);
}
