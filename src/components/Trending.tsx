import Link from "next/link";
import { FaChartLine, FaShare, FaCrown } from "react-icons/fa";

interface IPretender {
  team: string;
  odds: number;
  description: string;
  favorite?: boolean;
}

interface IMatch {
  left: IPretender;
  right: IPretender;
}

const matches: IMatch[] = [
  {
    left: {
      team: "Spain",
      odds: 3.2,
      description:
        "A powerhouse in international football. The 2010 World Cup winners.",
      favorite: true,
    },
    right: {
      team: "Italy",
      odds: 2.3,
      description:
        "Known for their defensive prowess, 4-time World Cup winners.",
    },
  },
  {
    left: {
      team: "New York Yankees",
      odds: 2.1,
      description: "One of the most successful franchises in MLB history.",
    },
    right: {
      team: "Boston Red Sox",
      odds: 3.5,
      description:
        "Rivals of the New York Yankees, known for intense matchups.",
    },
  },
];

function Card(match: IMatch) {
  return (
    <Link
      className="w-full shadow-md rounded-lg p-4 border border-neutral-700 flex-grow-0 flex-shrink-0 flex-auto bg-gray-800 relative hover:bg-gray-700 transition-colors duration-300"
      href="/event/example"
    >
      <div className="absolute top-4 right-4">
        <FaShare className="text-neutral-400" />
      </div>
      <div className="mb-3">
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="font-semibold text-3xl text-white">
              {match.left.odds}
            </p>
            {match.left.favorite && (
              <FaCrown className="text-neutral-400" size={22} />
            )}
          </div>
          <h3 className="mt-3 font-medium text-lg text-white font-just">
            {match.left.team}
          </h3>
          <p className="mt-1 text-neutral-400">{match.left.description}</p>
        </div>
        <div className="mt-4">
          <div className="flex flex-row items-center gap-2">
            <p className="font-semibold text-3xl text-white">
              {match.right.odds}
            </p>
            {match.right.favorite && (
              <FaCrown className="text-neutral-400" size={22} />
            )}
          </div>
          <h3 className="mt-3 font-medium text-lg text-white font-just">
            {match.right.team}
          </h3>
          <p className="mt-1 text-neutral-400">{match.right.description}</p>
        </div>
      </div>
      <p className="mt-auto">
        <span className="font-medium text-sm text-bb-accent pb-1 border-b-2 border-neutral-700 group-hover:border-[#ff0] transition focus:outline-none group-focus:border-[#ff0]">
          Place Bet
        </span>
      </p>
    </Link>
  );
}

export default function Trending() {
  return (
    <div className="flex flex-col mx-3 gap-3">
      <div className="flex flex-row gap-1 items-center">
        <FaChartLine className="text-bb-accent inline-block" />
        <h1 className="text-white font-bold mx-1">Trending</h1>
      </div>
      <div className="flex overflow-x-scroll gap-3 no-scrollbar ">
        {matches.map((match, index) => (
          <Card key={index} {...match} />
        ))}
      </div>
    </div>
  );
}
