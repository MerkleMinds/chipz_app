import { FaBolt } from "react-icons/fa6";

interface IMatch {
  team1: string;
  team2: string;
  odds1: number;
  oddsX: number;
  odds2: number;
  date: string;
  time: string;
}

const matches = [
  {
    team1: "Dallas Cowboys",
    team2: "New England Patriots",
    odds1: 2.1,
    oddsX: 2.7,
    odds2: 3.5,
    date: "2024-06-05",
    time: "20:00",
  },
  {
    team1: "Green Bay Packers",
    team2: "Pittsburgh Steelers",
    odds1: 1.5,
    oddsX: 1.9,
    odds2: 2.5,
    date: "2024-06-05",
    time: "21:00",
  },
  {
    team1: "Kansas City Chiefs",
    team2: "Tampa Bay Buccaneers",
    odds1: 1.5,
    oddsX: 1.2,
    odds2: 2.5,
    date: "2024-06-05",
    time: "21:00",
  },
  {
    team1: "Los Angeles Rams",
    team2: "San Francisco 49ers",
    odds1: 1.2,
    oddsX: 4.1,
    odds2: 5.6,
    date: "2024-06-06",
    time: "12:00",
  },
  {
    team1: "Buffalo Bills",
    team2: "Baltimore Ravens",
    odds1: 1.8,
    oddsX: 3.2,
    odds2: 2.8,
    date: "2024-06-08",
    time: "16:15",
  },
  {
    team1: "Seattle Seahawks",
    team2: "Arizona Cardinals",
    odds1: 1.4,
    oddsX: 2.2,
    odds2: 3.2,
    date: "2024-06-09",
    time: "18:30",
  },
  {
    team1: "New Orleans Saints",
    team2: "Miami Dolphins",
    odds1: 2.7,
    oddsX: 1.9,
    odds2: 2.2,
    date: "2024-06-10",
    time: "19:00",
  },
  {
    team1: "Chicago Bears",
    team2: "Minnesota Vikings",
    odds1: 1.7,
    oddsX: 2.3,
    odds2: 3.1,
    date: "2024-06-10",
    time: "20:15",
  },
];

function Entry(entry: IMatch) {
  return (
    <div className="w-full shadow-md rounded-lg p-3 border border-neutral-700 flex space-between justify-between items-center bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-semibold">{entry.team1}</h3>
        <h3 className="text-white font-semibold">{entry.team2}</h3>
        <span className="text-gray-500 text-xs">
          {entry.date}, {entry.time}
        </span>{" "}
      </div>
      <div className="flex flex-row gap-2">
        <button className="rounded-md text-white p-1 font-semibold text-lg">
          <span className="font-medium text-white pb-1 border-b-2 border-bb-accent group-hover:border-[#ff0] transition focus:outline-none group-focus:border-[#ff0]">
            {entry.odds1}
          </span>
        </button>
        <button className="rounded-md text-white p-1 font-semibold text-lg">
          <span className="font-medium text-white pb-1 border-b-2 border-bb-accent group-hover:border-[#ff0] transition focus:outline-none group-focus:border-[#ff0]">
            {entry.oddsX}
          </span>
        </button>
        <button className="rounded-md text-white p-1 font-semibold text-lg">
          <span className="font-medium text-white pb-1 border-b-2 border-bb-accent group-hover:border-[#ff0] transition focus:outline-none group-focus:border-[#ff0]">
            {entry.odds2}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function HeadToHead() {
  return (
    <div className="flex flex-col mx-3 gap-3">
      <div className="flex flex-row gap-1 items-center">
        <FaBolt className="text-bb-accent inline-block" />
        <h1 className="text-white font-bold mx-1 font-just">Head to Head</h1>
      </div>
      <div className="flex flex-col overflow-x-scroll gap-2 no-scrollbar ">
        {matches.map((match, index) => (
          <Entry key={index} {...match} />
        ))}
      </div>
    </div>
  );
}
