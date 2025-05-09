"use client";

import {
  FaBaseballBatBall,
  FaBasketball,
  FaFootball,
  FaFutbol,
  FaHockeyPuck,
  FaTrophy,
} from "react-icons/fa6";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Unified search item interface
export interface SearchItem {
  id: string;
  name: string;
  kind: string;
  image?: string;
  source: string;
}

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
  Science: <FaTrophy />
};

interface SearchInterfaceProps {
  items: SearchItem[];
}

/**
 * SearchInterface component provides a search functionality for various items
 * like teams, events, markets, etc. with autocomplete and filtering capabilities.
 */
export default function SearchInterface({ items }: SearchInterfaceProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>([]);

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === "") {
      setFilteredItems([]);
      return;
    }
    
    const filtered = items.filter(item => 
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // Navigate to appropriate page when an item is clicked
  const handleItemClick = (item: SearchItem) => {
    // Route based on the source type
    switch (item.source) {
      case 'team':
        router.push(`/event/${item.id.replace('team_', '')}`);
        break;
      case 'event':
        router.push(`/event/${item.id}`);
        break;
      default:
        router.push(`/events/${item.id}`);
    }
  };

  // Helper function to determine if an image is external or local
  const isExternalImage = (src: string) => {
    return src.startsWith('http') || src.startsWith('https');
  };

  // Render search result item
  const renderSearchItem = (item: SearchItem) => (
    <div 
      key={item.id}
      onClick={() => handleItemClick(item)}
      className="flex items-center p-3 border border-gray-700 rounded-md bg-gray-800 cursor-pointer hover:bg-gray-700 transition-colors"
    >
      <div className="flex-shrink-0 w-10 h-10 mr-3 relative">
        {item.image ? (
          isExternalImage(item.image) ? (
            <Image 
              src={item.image}
              alt={item.name}
              width={40}
              height={40}
              className="object-contain"
              unoptimized={true}
            />
          ) : (
            <Image 
              src={item.image}
              alt={item.name}
              width={40}
              height={40}
              className="object-contain"
            />
          )
        ) : (
          <div className="flex items-center justify-center w-full h-full text-white">
            {kindToIcon[item.kind] || <FaTrophy />}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-white font-medium">{item.name}</p>
        <p className="text-gray-400 text-sm">{item.kind}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md flex flex-col">
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search teams, bets, markets..."
          className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      </div>
      
      <div className="mt-4 w-full flex flex-col gap-2">
        {filteredItems.map(renderSearchItem)}
        
        {searchTerm && filteredItems.length === 0 && (
          <div className="p-3 border border-gray-700 rounded-md bg-gray-800 text-gray-400">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}
