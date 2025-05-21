"use client";

import {
  FaBaseballBatBall,
  FaBasketball,
  FaFootball,
  FaFutbol,
  FaHockeyPuck,
  FaTrophy,
} from "react-icons/fa6";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { searchItems } from "@/utils/data/dataService";
import { SearchItem } from "@/utils/data/types"; // Import from central types file

// Icon mapping for different kinds of items
const kindToIcon: Record<string, JSX.Element> = {
  Baseball: <FaBaseballBatBall />,
  Basketball: <FaBasketball />,
  Football: <FaFootball />,
  Hockey: <FaHockeyPuck />,
  Soccer: <FaFutbol />,
  Competition: <FaTrophy />,
  Politics: <FaTrophy />,
  Crypto: <FaTrophy />,
  Science: <FaTrophy />,
  Event: <FaTrophy />
};

/**
 * SearchInterface component provides a search functionality for various items
 * like teams, events, markets, etc. with autocomplete and filtering capabilities.
 */
export default function SearchInterface() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized search function to prevent unnecessary re-renders
  const performSearch = useCallback((query: string) => {
    if (query.trim() === "") {
      setFilteredItems([]);
      setIsLoading(false);
      setError(null);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Use the searchItems function from dataService
      const filtered = searchItems(query);
      
      // Validate the returned data to ensure it's properly structured
      if (!Array.isArray(filtered)) {
        throw new Error('Invalid search results format');
      }
      
      setFilteredItems(filtered);
      
      // Show a message if no results found
      if (filtered.length === 0) {
        setError(`No results found for "${query}". Try a different search term.`);
      }
    } catch (err) {
      console.error("Search error:", err);
      setFilteredItems([]);
      
      // Provide more specific error messages based on error type
      if (err instanceof TypeError) {
        setError("There was a problem with the search data. Please try again later.");
      } else if (err instanceof Error) {
        setError(`Search error: ${err.message}. Please try again.`);
      } else {
        setError("An unexpected error occurred while searching. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Handle search input changes with debounce
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Immediate feedback for empty search
    if (value.trim() === "") {
      setFilteredItems([]);
      setIsLoading(false);
      setError(null);
    } else {
      // Show loading state immediately for better UX
      setIsLoading(true);
    }
  };
  
  // Use useEffect with proper dependencies and debounce
  useEffect(() => {
    // Debounce search to avoid excessive API calls
    const timer = setTimeout(() => {
      if (searchTerm) {
        performSearch(searchTerm);
      }
    }, 300); // 300ms debounce
    
    // Cleanup function to prevent memory leaks
    return () => clearTimeout(timer);
  }, [searchTerm, performSearch]); // Only depend on searchTerm and the memoized search function

  // Navigate to appropriate page when an item is clicked
  const handleItemClick = useCallback((item: SearchItem) => {
    // Simplified routing - all items go to the events page
    router.push(`/events/${item.id}`);
  }, [router]);

  // Helper function to determine if an image is external or local
  const isExternalImage = (src: string) => {
    return src.startsWith('http') || src.startsWith('https');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Search input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for events, teams, or players..."
          className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-bb-accent"></div>
        </div>
      )}

      {/* Error message */}
      {error && !isLoading && (
        <div className="text-center text-red-400 py-4 border border-chipz-custom rounded-lg bg-gray-800 mb-4">
          {error}
        </div>
      )}

      {/* Results list */}
      <div className="space-y-2">
        {!isLoading && filteredItems.length > 0 && (
          <div className="text-xs text-chipz-gray-light mb-2 pl-2">
            Found {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
          </div>
        )}
        
        {!isLoading && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-3 bg-gray-800 border border-chipz-custom rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => handleItemClick(item)}
            >
              {item.image ? (
                <div className="w-10 h-10 mr-3 rounded-full overflow-hidden flex-shrink-0">
                  {isExternalImage(item.image) ? (
                    // For external images, use an img tag instead of Next.js Image to avoid config issues
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    // For internal images, use Next.js Image component
                    <Image
                      src={`/images/${item.image}`}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              ) : (
                <div className="w-10 h-10 mr-3 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  {kindToIcon[item.kind] || <FaTrophy />}
                </div>
              )}
              <div className="flex-grow">
                <div className="text-white font-medium">{item.name}</div>
                <div className="text-gray-400 text-sm">{item.kind}</div>
              </div>
            </div>
          ))
        ) : !isLoading && searchTerm && !error ? (
          <div className="text-center text-gray-400 py-8">
            No results found for "{searchTerm}"
          </div>
        ) : null}
      </div>
    </div>
  );
}
