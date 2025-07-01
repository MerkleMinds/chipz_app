import { notFound } from "next/navigation";
import SectionContent, { SectionData } from "@/components/SectionContent";
import sections, { getCategoryIcon } from "@/utils/data/sections";
import { getEventsBySection } from "@/utils/data/dataService";
import { Event as EventType, SubcategoryInfo } from "@/utils/data/types";

interface SectionPageProps {
  params: {
    section: string;
  };
}

/**
 * Format events for display in the UI
 * @param events Array of events to format
 * @returns Formatted items object for SectionContent
 */
function formatEventsForDisplay(events: EventType[]) {
  return {
    multiChoice: events
      .filter(event => (event.options?.length ?? 0) > 0)
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
    
    trends: events
      .filter(event => !event.options && (event.historyData?.length ?? 0) > 0)
      .map(event => {
        const historyData = event.historyData || [];
        const latestProb = event.probability;
        const earliestProb = historyData[0]?.probability ?? latestProb;
        const change = latestProb - earliestProb;
        const probChange = change >= 0 ? `+${change.toFixed(1)}` : `${change.toFixed(1)}`;
        
        return {
          type: "trend",
          id: event.id,
          title: event.title,
          probability: event.probability,
          probabilityChange: probChange,
          image: event.imageUrl,
          history: historyData
        };
      })
  };
}

/**
 * Group events by subcategory and format them for display
 */
function prepareCategories(sectionId: string, sectionEvents: EventType[], sectionMeta: any) {
  // If the section has defined subcategories, use them
  if (sectionMeta.subcategories?.length > 0) {
    const eventsBySubcategory = new Map<string, EventType[]>();
    
    // Initialize map with empty arrays for all subcategories and a general category
    sectionMeta.subcategories.forEach((sub: SubcategoryInfo) => eventsBySubcategory.set(sub.id, []));
    eventsBySubcategory.set('general', []);
    
    // Distribute events to their respective subcategories
    sectionEvents.forEach(event => {
      const subcategoryId = event.subcategory ? 
        sectionMeta.subcategories?.find((sub: SubcategoryInfo) => 
          sub.name.toLowerCase() === event.subcategory?.toLowerCase() || 
          sub.id.toLowerCase() === event.subcategory?.toLowerCase()
        )?.id : null;
      
      if (subcategoryId && eventsBySubcategory.has(subcategoryId)) {
        eventsBySubcategory.get(subcategoryId)?.push(event);
      } else {
        eventsBySubcategory.get('general')?.push(event);
      }
    });
    
    // Convert subcategories to the format expected by SectionContent
    const categories = sectionMeta.subcategories
      .map((subcategory: SubcategoryInfo) => {
        const subCatEvents = eventsBySubcategory.get(subcategory.id) || [];
        if (subCatEvents.length === 0) return null;
        
        return {
          id: subcategory.id,
          title: subcategory.name,
          icon: getCategoryIcon(subcategory.id, 'inline-block text-bb-accent', 16),
          items: formatEventsForDisplay(subCatEvents)
        };
      })
      .filter(Boolean);
    
    // Add general category if it has events
    const generalEvents = eventsBySubcategory.get('general') || [];
    if (generalEvents.length > 0) {
      categories.push({
        id: 'general',
        title: 'General',
        icon: getCategoryIcon(sectionId, 'inline-block text-bb-accent', 16),
        items: formatEventsForDisplay(generalEvents)
      });
    }
    
    return categories;
  } 
  
  // If no subcategories defined, group by event subcategory
  const subCategories = sectionEvents.reduce((acc, event) => {
    const subCat = event.subcategory || 'General';
    if (!acc[subCat]) acc[subCat] = [];
    acc[subCat].push(event);
    return acc;
  }, {} as Record<string, EventType[]>);

  // Transform events into the format expected by SectionContent
  return Object.keys(subCategories).map(subCat => {
    const subCatEvents = subCategories[subCat];
    return {
      id: subCat.toLowerCase().replace(/\s+/g, '-'),
      title: subCat,
      icon: getCategoryIcon(subCat, 'inline-block text-bb-accent', 16),
      items: formatEventsForDisplay(subCatEvents)
    };
  });
}

export default async function SectionPage({ params }: SectionPageProps) {
  const section = params.section.toLowerCase();
  
  // Find the section metadata from our sections list
  const sectionMeta = sections.find(s => s.name.toLowerCase() === section || s.id === section);
  if (!sectionMeta) return notFound();

  try {
    // Get events and prepare categories
    const sectionEvents = getEventsBySection(sectionMeta.id);
    const categories = prepareCategories(sectionMeta.id, sectionEvents, sectionMeta);
    
    // Create the section data
    const sectionData: SectionData = {
      categories,
      showSeeMore: false
    };
    
    return <SectionContent data={sectionData} />;
  } catch (error) {
    console.error(`Error loading data for section: ${section}`, error);
    return notFound();
  }
}

// Generate static paths for all sections
export function generateStaticParams() {
  return sections.map(section => ({
    section: section.name.toLowerCase()
  }));
}
