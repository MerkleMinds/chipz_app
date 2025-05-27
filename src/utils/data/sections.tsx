import { FaBolt, FaLandmark, FaFootball, FaBitcoin, FaChartLine, FaGlobe } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { SectionInfo } from "./types";

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
  },
  { 
    id: "politics",
    name: "Politics", 
    icon: <FaLandmark className="inline-block" />, 
    path: "/politics",
    description: "Political events and predictions",
    featuredEventIds: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEvents: 0
    }
  },
  { 
    id: "sports",
    name: "Sports", 
    icon: <FaFootball className="inline-block" />, 
    path: "/sports",
    description: "Sports events and predictions",
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
    featuredEventIds: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEvents: 0
    }
  },
  // { name: "Search", icon: <FaMagnifyingGlass className="inline-block" />, path: "/search" },
];

export default sections;
