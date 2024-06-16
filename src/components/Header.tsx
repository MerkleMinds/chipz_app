"use client";
import {
  FaFootball,
  FaFutbol,
  FaBaseballBatBall,
  FaTableTennisPaddleBall,
  FaGolfBallTee,
  FaTrophy,
  FaMagnifyingGlass,
  FaBolt,
  FaCalendarDay,
  FaBitcoinSign,
} from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sports = [
  { name: "Live", icon: FaBolt },
  { name: "Today", icon: FaCalendarDay },
  { name: "Lossless", icon: FaBitcoinSign },
  { name: "NFL", icon: FaFootball },
  { name: "Soccer", icon: FaFutbol },
  { name: "Baseball", icon: FaBaseballBatBall },
  { name: "Tennis", icon: FaTableTennisPaddleBall },
  { name: "Golf", icon: FaGolfBallTee },
  { name: "Euros", icon: FaTrophy },
  { name: "Search", icon: FaMagnifyingGlass },
];

const Icon = (prop: (typeof sports)[number]) => (
  <div className="flex items-center justify-center gap-1 flex-col min-w-10 max-w-10 text-neutral-400 hover:text-white transition-colors duration-300">
    <prop.icon size={24} />
    <span className="text-xs">{prop.name}</span>
  </div>
);

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full pt-2 pb-3 bg-gray-900 shadow-lg gap-3">
      <nav
        className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-8 mx-auto"
        aria-label="Global"
      >
        <Link className="md:col-span-3" href="/">
          <img src="/logo.png" alt="BlockBet" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-white dark:hover:bg-white/10 dark:text-white dark:hover:text-white"
          >
            Log in
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 border-bb-accent text-bb-accent bg-[#ff5f1f30] hover:border-bb-accent transition disabled:opacity-50 disabled:pointer-events-none focus:bg-[#ff5f1f50]"
          >
            Register
          </button>
        </div>
      </nav>
      <div className="flex mx-4 gap-5 overflow-x-scroll no-scrollbar">
        {sports.map((sport) => (
          <Icon key={sport.name} {...sport} />
        ))}
      </div>
    </header>
  );
}
