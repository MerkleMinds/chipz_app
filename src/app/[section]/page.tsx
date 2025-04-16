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

  // Fetch data from the API endpoint
  let data: SectionData;
  try {
    
    // Use proper absolute URL for server components
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    
    // First try the API endpoint
    try {
      const response = await fetch(`${baseUrl}/api/${section}`, {
        // Don't use both no-store and revalidate together
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      
      data = await response.json();
    } catch (apiError) {
      console.error(`Page: API fetch failed for section: ${section}`, apiError);
      
      // Fallback to direct import if API fails
      console.log(`Page: Falling back to direct import for: ${section}`);
      data = require(`@/utils/data/sections/${section}.json`);
      console.log(`Page: Successfully loaded data via direct import for: ${section}`);
    }
  } catch (error) {
    console.error(`Page: Error loading data for section: ${section}`, error);
    return notFound();
  }

  return (
    <div className="mx-3 mt-2">
      <SectionContent data={data} section={sectionMeta} />
    </div>
  );
}

// Generate static paths for all sections
export function generateStaticParams() {
  return sections.map(section => ({
    section: section.name.toLowerCase()
  }));
}
