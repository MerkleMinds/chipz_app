import { FaBolt, FaLandmark, FaFootball, FaBitcoin, FaAt } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { ReactElement } from "react";

export interface SectionInfo {
  name: string;
  icon: ReactElement;
  path: string;
}

const sections: SectionInfo[] = [
  { name: "Live", icon: <FaBolt className="inline-block" />, path: "/live" },
  { name: "Politics", icon: <FaLandmark className="inline-block" />, path: "/politics" },
  { name: "Sports", icon: <FaFootball className="inline-block" />, path: "/sports" },
  { name: "Economy", icon: <IoBriefcaseOutline className="inline-block" />, path: "/economy" },
  { name: "Crypto", icon: <FaBitcoin className="inline-block" />, path: "/crypto" },
  { name: "Mentions", icon: <FaAt className="inline-block" />, path: "/mentions" },
  // { name: "Search", icon: <FaMagnifyingGlass className="inline-block" />, path: "/search" },
];

export default sections;
