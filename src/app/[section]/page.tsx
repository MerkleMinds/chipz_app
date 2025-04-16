import { notFound } from "next/navigation";
import SectionContent, { SectionData } from "@/components/SectionContent";
import sections from "@/utils/data/sections";

// Define the props for the page component
interface SectionPageProps {
  params: {
    section: string;
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const section = params.section.toLowerCase();
  
  // Find the section metadata from our sections list
  const sectionMeta = sections.find(s => s.name.toLowerCase() === section);
  if (!sectionMeta) {
    console.log(`Page: Section metadata not found for: ${section}`);
    return notFound();
  }

  // Fetch data from the API endpoint or use direct import
  let data: SectionData;
  try {
    // Check if API fetching is explicitly enabled
    const useApi = process.env.NEXT_PUBLIC_USE_API_FETCH === 'true';
    
    if (useApi) {
      try {
        // Use proper absolute URL for server components
        const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
        const host = process.env.VERCEL_URL || 'localhost:3000';
        const baseUrl = `${protocol}://${host}`;
        
        // First try the API endpoint
        const response = await fetch(`${baseUrl}/api/${section}`, {
          next: { revalidate: 3600 }
        });
        
        if (!response.ok) {
          throw new Error(`API returned status: ${response.status}`);
        }
        
        data = await response.json();
      } catch (apiError) {
        console.error(`API fetch failed for section: ${section}`, apiError);
        
        // Fallback to direct import if API fails
        data = require(`@/utils/data/sections/${section}.json`);
        console.log(`Page: Successfully loaded data via direct import for: ${section}`);
      }
    } else {
      // Default: use static import directly
      data = require(`@/utils/data/sections/${section}.json`);
    }
  } catch (error) {
    console.error(`Page: Error loading data for section: ${section}`, error);
    return notFound();
  }

  return (
    <div className="mx-3 mt-2">
      <SectionContent data={data} />
    </div>
  );
}

// Generate static paths for all sections
export function generateStaticParams() {
  return sections.map(section => ({
    section: section.name.toLowerCase()
  }));
}
