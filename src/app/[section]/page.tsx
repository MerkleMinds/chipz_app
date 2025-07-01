import SectionContent, { SectionData } from "@/components/SectionContent";
import sections, { getSubcategoryIcon } from "@/utils/data/sections";
import { getEventsBySection } from "@/utils/data/dataService";
import { Event as EventType } from "@/utils/data/types";

// Define the props for the page component
interface SectionPageProps {
  params: {
    section: string;
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
 is
    
    // Create the section data with categories
    const sectionData: SectionData = {
      categories: categories as any[],
      showSeeMore: false
    };
    
    return (
      <div>
        <SectionContent data={sectionData} />
      </div>
    );
  } catch (error) {
    console.error(`Page: Error loading data for section: ${section}`, error);
    return notFound();
  }
}

/**
 * Format events for display in the UI
 * @param events Array of events to format
 * @returns Formatted items object for SectionContent
 */
function formatEventsForDisplay(events: EventType[]) {
  return {
    // For events with options (multi-choice markets)
    multiChoice: events
      .filter(event => event.options && event.options.length > 0)
      .map(event => ({
        type: "number",
        id: event.id,
        title: event.title,
        totalVolume: event.totalVolume || "N/A",
        imageUrl: event.imageUrl,
        options: event.options?.map(opt => ({
          name: opt.title,
          probability: opt.probability
        })) || []
      })),
    
    // For binary events (yes/no markets)
    trends: events
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
  };
}

// Generate static paths for all sections
export function generateStaticParams() {
  return sections.map(section => ({
    section: section.name.toLowerCase()
  }));
}
