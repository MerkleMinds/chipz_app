import { FaBolt, FaLandmark, FaFootball, FaBitcoin, FaAt } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { SectionInfo } from "./types";

const sections: SectionInfo[] = [
  { 
    id: "live",
    name: "Live", 
    icon: <FaBolt className="inline-block" />, 
    path: "/live",
    description: "Live events happening right now",
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
    id: "economy",
    name: "Economy", 
    icon: <IoBriefcaseOutline className="inline-block" />, 
    path: "/economy",
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
    id: "mentions",
    name: "Mentions", 
    icon: <FaAt className="inline-block" />, 
    path: "/mentions",
    description: "Mentions and references",
    featuredEventIds: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalEvents: 0
    }
  },
  // { name: "Search", icon: <FaMagnifyingGlass className="inline-block" />, path: "/search" },
];

export default sections;
