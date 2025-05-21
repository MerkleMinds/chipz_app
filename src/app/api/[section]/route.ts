import { NextRequest, NextResponse } from "next/server";
import sections from "@/utils/data/sections";
import eventsData from "@/utils/data/enhanced_events.json" with { type: "json" };
import { SectionData } from "@/components/SectionContent";

export async function GET(
  _request: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const section = params.section.toLowerCase();
    
    // Validate section name to prevent security issues
    if (!/^[a-z]+$/.test(section)) {
      console.log(`API: Invalid section name: ${section}`);
      return NextResponse.json(
        { error: "Invalid section name" },
        { status: 400 }
      );
    }
    
    // Find the section metadata from our sections list
    const sectionMeta = sections.find(s => s.name.toLowerCase() === section || s.id === section);
    if (!sectionMeta) {
      console.log(`API: Section metadata not found for: ${section}`);
      return NextResponse.json(
        { error: "Section not found" },
        { status: 404 }
      );
    }
    
    // Get the section ID from the metadata
    const sectionId = sectionMeta.id;
    
    // Filter events by section
    const sectionEvents = (eventsData as any[]).filter(event => event.section === sectionId);
    
    // Sort events: trending first, then new, then by probability
    const sortedEvents = [...sectionEvents].sort((a, b) => {
      // First sort by trending
      if (a.isTrending && !b.isTrending) return -1;
      if (!a.isTrending && b.isTrending) return 1;
      
      // Then by new
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      
      // Then by probability (higher first)
      return b.probability - a.probability;
    });
    
    // Transform events into the format expected by SectionContent
    const sectionData: SectionData = {
      categories: [
        {
          title: sectionMeta.name,
          items: {
            // For events with options (multi-choice markets)
            multiChoice: sortedEvents
              .filter(event => event.options && event.options.length > 0)
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
            trends: sortedEvents
              .filter(event => !event.options && event.historyData && event.historyData.length > 0)
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
        }
      ]
    };
    
    return NextResponse.json(sectionData);
  } catch (error) {
    console.error(`API: Error loading section data: ${params.section}`, error);
    return NextResponse.json(
      { error: "Section not found" },
      { status: 404 }
    );
  }
}
