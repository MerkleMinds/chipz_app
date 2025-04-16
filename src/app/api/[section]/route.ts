import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

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
    
    try {
      // Dynamically import the section data from the new folder structure
      const sectionData = await import(`@/utils/data/sections/${section}.json`);
      return NextResponse.json(sectionData.default);
    } catch (importError) {
      console.error(`API: Import error for section ${section}:`, importError);
      
      // Fallback approach - try to read the file directly
      try {
        const filePath = path.join(process.cwd(), 'src', 'utils', 'data', 'sections', `${section}.json`);
        console.log(`API: Trying to read file directly from: ${filePath}`);
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);
        console.log(`API: Successfully read file directly for section: ${section}`);
        return NextResponse.json(jsonData);
      } catch (fsError) {
        console.error(`API: File system error for section ${section}:`, fsError);
        throw new Error(`Could not load section data: ${section}`);
      }
    }
  } catch (error) {
    console.error(`API: Error loading section data: ${params.section}`, error);
    return NextResponse.json(
      { error: "Section not found" },
      { status: 404 }
    );
  }
}
