import { FaAnglesRight, FaTrophy } from "react-icons/fa6";

interface ILeagueProps {
  region: string;
  league: string;
  image: string;
}

function Card({ region, league, image }: ILeagueProps) {
  return (
    <div className="w-64 h-[125px] shadow-md border border-neutral-700 flex-grow-0 flex-shrink-0 flex-auto rounded-xl bg-gray-800 flex items-center justify-between flex-row p-5  transition-colors duration-300">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-neutral-400">{region}</p>
        <h1 className="text-xl text-white">{league}</h1>
        <div className="flex flex-row gap-1 items-center text-xs text-bb-accent">
          <a href="#">See more</a>
          <FaAnglesRight />
        </div>
      </div>
      <img src={image} alt={league} className="h-20 w-auto" />
    </div>
  );
}

const leagues: ILeagueProps[] = [
  {
    region: "Spain",
    league: "La Liga",
    image:
      "https://assets.laliga.com/assets/logos/LL_RGB_h_color/LL_RGB_h_color.png",
  },
  {
    region: "Europe",
    league: "Euro 2024",
    image: "/euro2024_dark.png",
  },
  {
    region: "England",
    league: "Premier League",
    image:
      "https://seeklogo.com/images/P/premier-league-new-logo-D22A0CE87E-seeklogo.com.png",
  },
];

export default function League() {
  return (
    <div className="flex flex-col mx-3 mt-3 gap-3 text-xs">
      <div className="flex flex-row gap-1 items-center">
        <FaTrophy className="text-bb-accent inline-block" />
        <h1 className="text-white font-bold mx-1 font-just text-sm">
          Competitions
        </h1>
      </div>
      <div className="flex overflow-x-scroll gap-3 no-scrollbar">
        {leagues.map((item, index) => <Card
          key={`league-${index}`}
          {...item}
        />)}
      </div>
    </div>
  );
}
