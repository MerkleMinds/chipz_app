import {
  FaArrowTrendUp,
  FaClock,
  FaCrown,
  FaDice,
  FaFutbol,
  FaPerson,
} from "react-icons/fa6";

import Link from "next/link";

const icons = {
  Main: <FaCrown />,
  Goals: <FaFutbol />,
  Asian: <FaDice />,
  Extra: <FaArrowTrendUp />,
  "15 minutes": <FaClock />,
  Players: <FaPerson />,
} as const;

export default function Menu() {
  return (
    <div className="flex overflow-x-scroll no-scrollbar py-2 gap-2 text-white text-sm mx-2 rounded-md">
      {(Object.keys(icons) as Array<keyof typeof icons>).map((
        section,
        index,
      ) => (
        <Link
          href={`#${section.toLowerCase().replace(" ", "-")}`}
          key={`${section}-${index}`}
          className="flex items-center flex-row gap-2 justify-center px-4 py-2 bg-gray-800 rounded-md border border-neutral-700"
        >
          {icons[section]}
          <p className="whitespace-nowrap">{section}</p>
        </Link>
      ))}
    </div>
  );
}
