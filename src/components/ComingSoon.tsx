"use client";

import { FaHourglassHalf } from "react-icons/fa6";

interface ComingSoonProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function ComingSoon({
  title = "Coming Soon",
  message = "This feature is currently under development and will be available soon.",
  className = ""
}: ComingSoonProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center rounded-lg bg-bb-dark border border-bb-accent/20 ${className}`}>
      <FaHourglassHalf className="text-bb-accent text-4xl mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400">{message}</p>
    </div>
  );
}
