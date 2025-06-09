import { notFound } from "next/navigation";
import SectionContent, { SectionData } from "@/components/SectionContent";
import sections from "@/utils/data/sections";
import { getEventsBySection } from "@/utils/data/dataService";
import { Event as EventType } from "@/utils/data/types";

// Define the props for the page component
interface SectionPageProps {
  params: {
    section: string;
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const section = params.section.toLowerCase();
  
  // Find the section metadata from our sections list
  const sectionMeta = sections.find(s => s.name.toLowerCase() === section || s.id === section);
  if (!sectionMeta) {
    console.log(`Page: Section metadata not found for: ${section}`);
    return notFound();
  }

  // Get the section ID from the metadata
  const sectionId = sectionMeta.id;
  
  try {
    // Get events for this section using our enhanced data service
    const sectionEvents = getEventsBySection(sectionId);

    // Split events into separate arrays by subcategory
    const subCategories = sectionEvents.reduce((acc, event) => {
      // Use a default subcategory name if subcategory is undefined
      const subCat = event.subcategory || 'General';
      
      if (acc[subCat]) {
        acc[subCat].push(event);
      } else {
        acc[subCat] = [event];
      }
      return acc;
    }, {} as Record<string, EventType[]>);

    // Transform events into the format expected by SectionContent
    const sectionData: SectionData = {
      categories: Object.keys(subCategories).map(subCat => {
        const subCatEvents = subCategories[subCat];
        return {
          title: subCat,
          items: {
            // For events with options (multi-choice markets)
            multiChoice: subCatEvents
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
            trends: subCatEvents
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
        };
      })
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

// Generate static paths for all sections
export function generateStaticParams() {
  return sections.map(section => ({
    section: section.name.toLowerCase()
  }));
}
