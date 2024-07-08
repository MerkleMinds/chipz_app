"use client";

import {
  FaHouse,
  FaMagnifyingGlass,
  FaMoneyBills,
  FaUser,
} from "react-icons/fa6";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Bottom() {
  const pathname = usePathname();

  const links = [
    { href: "/", icon: <FaHouse className="text-xl mb-1" />, text: "Home" },
    {
      href: "/search",
      icon: <FaMagnifyingGlass className="text-xl mb-1" />,
      text: "Search",
    },
    {
      href: "/bets",
      icon: <FaMoneyBills className="text-xl mb-1" />,
      text: "Bets",
    },
    {
      href: "/profile",
      icon: <FaUser className="text-xl mb-1" />,
      text: "Profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around py-3 px-4 z-[100] shadow-lg">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex flex-col items-center justify-center transition-colors duration-300 ${
            pathname === link.href ? "text-white" : "text-neutral-500"
          }`}
        >
          {link.icon}
          <span className="text-xs">{link.text}</span>
        </Link>
      ))}
    </nav>
  );
}
