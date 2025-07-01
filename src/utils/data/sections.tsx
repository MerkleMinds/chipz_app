import React from "react";
import { FaBolt, FaLandmark, FaFootballBall, FaBitcoin, FaChartLine, FaGlobe, FaBalanceScale, FaFileContract, FaFutbol, FaBasketballBall, FaTableTennis } from "react-icons/fa";
import { FaChartSimple, FaHouseChimney, FaPersonWalking, FaArrowTrendUp, FaCoins, FaCartShopping, FaHandshake, FaBuildingColumns, FaFire, FaPeopleGroup, FaMicrochip } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { SiEthereum } from "react-icons/si";
import { SectionInfo, SubcategoryInfo } from "./types";

const sections: SectionInfo[] = [
  { 
    id: "trending",
    name: "Trending", 
    icon: <FaBolt className="inline-block" />, 
    path: "/trending",
    description: "Most popular and trending events",
    featuredEventIds: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEvents: 0
    }
    // No subcategories for trending as it's a dynamic collection
  },
  { 
    id: "politics",
    name: "Politics", 
    icon: <FaLandmark className="inline-block" />, 
    path: "/politics",
    description: "Political events and predictions",
    subcategories: [
      { id: "judiciary", name: "Judiciary", icon: <FaBalanceScale className="inline-block" /> },
      { id: "trade", name: "Trade", icon: <FaHandshake className="inline-block" /> },
      { id: "legislation", name: "Legislation", icon: <FaFileContract className="inline-block" /> }
    ],
    featuredEventIds: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEvents: 0
    }
  },
  { 
    id: "sports",
    name: "Sports", 
    icon: <FaFootballBall className="inline-block" />, 
    path: "/sports",
    description: "Sports events and predictions",
    subcategories: [
      { id: "soccer", name: "Soccer", icon: <FaFutbol className="inline-block" /> },
      { id: "basketball", name: "Basketball", icon: <FaBasketballBall className="inline-block" /> },
      { id: "tennis", name: "Tennis", icon: <FaTableTennis className="inline-block" /> }
    ],
    featuredEventIds: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEvents: 0
    }
  },
  { 
    id: "economics",
    name: "Economics", 
    icon: <IoBriefcaseOutline className="inline-block" />, 
    path: "/economics",
    description: "Economic events and predictions",
    subcategories: [
      { id: "gdp", name: "GDP", icon: <FaChartSimple className="inline-block" /> },
      { id: "housing", name: "Housing", icon: <FaHouseChimney className="inline-block" /> },
      { id: "employment", name: "Employment", icon: <FaPersonWalking className="inline-block" /> },
      { id: "inflation", name: "Inflation", icon: <FaArrowTrendUp className="inline-block" /> }
    ],
    featuredEventIds: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEvents: 0
    }
  },
  { 
    id: "crypto",
    name: "Crypto", 
    icon: <FaBitcoin className="inline-block" />, 
    path: "/crypto",
    description: "Cryptocurrency events and predictions",
    subcategories: [
      { id: "bitcoin", name: "Bitcoin", icon: <FaBitcoin className="inline-block" /> },
      { id: "ethereum", name: "Ethereum", icon: <SiEthereum className="inline-block" /> },
      { id: "altcoins", name: "Altcoins", icon: <FaCoins className="inline-block" /> }
    ],
    featuredEventIds: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEvents: 0
    }
  },
  { 
    id: "finance",
    name: "Finance", 
    icon: <FaChartLine className="inline-block" />, 
    path: "/finance",
    description: "Financial markets and investment predictions",
    subcategories: [
      { id: "markets", name: "Markets", icon: <FaCartShopping className="inline-block" /> },
      { id: "companies", name: "Companies & Deals", icon: <FaHandshake className="inline-block" /> },
      { id: "commodities", name: "Commodities", icon: <FaCoins className="inline-block" /> },
      { id: "banking", name: "Banking", icon: <FaBuildingColumns className="inline-block" /> }
    ],
    featuredEventIds: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEvents: 0
    }
  },
  { 
    id: "world",
    name: "World Events", 
    icon: <FaGlobe className="inline-block" />, 
    path: "/world",
    description: "Global events and international predictions",
    subcategories: [
      { id: "crises", name: "Crises", icon: <FaFire className="inline-block" /> },
      { id: "culture", name: "Culture & Society", icon: <FaPeopleGroup className="inline-block" /> },
      { id: "tech", name: "Tech", icon: <FaMicrochip className="inline-block" /> }
    ],
    featuredEventIds: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEvents: 0
    }
  },
  // { name: "Search", icon: <FaMagnifyingGlass className="inline-block" />, path: "/search" },
];

/**
 * Get the icon component for a category or subcategory by its name or ID with custom styling
 * @param categoryNameOrId The name or ID of the category or subcategory
 * @param className Optional CSS class to apply to the icon (e.g., 'text-bb-accent')
 * @param size Optional size to apply to the icon (e.g., 24)
 * @returns The icon component for the category/subcategory with custom styling or a default icon if not found
 */
export const getCategoryIcon = (categoryNameOrId: string, className?: string, size?: number) => {
  const normalizedInput = categoryNameOrId.toLowerCase();
  let iconElement = null;
  
  // First try to match by section ID
  const sectionById = sections.find(s => s.id.toLowerCase() === normalizedInput);
  if (sectionById) iconElement = sectionById.icon;
  
  // Then try to match by section name
  else {
    const sectionByName = sections.find(s => s.name.toLowerCase() === normalizedInput);
    if (sectionByName) iconElement = sectionByName.icon;
    
    // Try to find a matching subcategory
    else {
      for (const section of sections) {
        if (section.subcategories) {
          // Check subcategory by ID
          const subcategoryById = section.subcategories.find(
            sub => sub.id.toLowerCase() === normalizedInput
          );
          if (subcategoryById && subcategoryById.icon) {
            iconElement = subcategoryById.icon;
            break;
          }
          
          // Check subcategory by name
          const subcategoryByName = section.subcategories.find(
            sub => sub.name.toLowerCase() === normalizedInput
          );
          if (subcategoryByName && subcategoryByName.icon) {
            iconElement = subcategoryByName.icon;
            break;
          }
        }
      }
      
      // Handle special cases for backward compatibility
      if (!iconElement && normalizedInput === 'economy') {
        const economicsSection = sections.find(s => s.id === 'economics');
        iconElement = economicsSection ? economicsSection.icon : sections[0].icon;
      }
    }
  }
  
  // Use default icon if nothing was found
  if (!iconElement) iconElement = sections[0].icon;
  
  // Apply custom styling if provided
  const customClass = className || 'inline-block';
  
  // Clone the icon with new props
  return React.cloneElement(iconElement, { 
    className: customClass,
    size: size
  });
};

/**
 * Get a subcategory icon by its ID and parent section ID with custom styling
 * @param sectionId The ID of the parent section
 * @param subcategoryId The ID of the subcategory
 * @param className Optional CSS class to apply to the icon (e.g., 'text-bb-accent')
 * @param size Optional size to apply to the icon (e.g., 24)
 * @returns The icon component for the subcategory with custom styling or the section icon if not found
 */
export const getSubcategoryIcon = (sectionId: string, subcategoryId: string, className?: string, size?: number) => {
  const section = sections.find(s => s.id.toLowerCase() === sectionId.toLowerCase());
  if (!section) return React.cloneElement(sections[0].icon, { 
    className: className || 'inline-block',
    size: size
  });
  
  let iconElement = section.icon; // Default to section icon
  
  if (section.subcategories) {
    // Explicitly type the subcategory as SubcategoryInfo
    const subcategory: SubcategoryInfo | undefined = section.subcategories.find(
      sub => sub.id.toLowerCase() === subcategoryId.toLowerCase()
    );
    if (subcategory && subcategory.icon) iconElement = subcategory.icon;
  }
  
  // Apply custom styling
  const customClass = className || 'inline-block';
  
  // Clone the icon with new props
  return React.cloneElement(iconElement, { 
    className: customClass,
    size: size
  });
};

export default sections;
