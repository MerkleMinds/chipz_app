"use client";

import { FaBolt, FaGear } from "react-icons/fa6";

import { type IMatchv2 } from "@/components/Live";
import { getIcon } from "@/components/Live";
import { hashBet } from "@/components/bets/Betv2";
import { useAppContext } from "@/components/Context";

const matchesv2: IMatchv2[] = [
  {
    competition: "Euro 2024",
    elapsed: 45,
    status: "Tomorrow, 20:00",
    kind: "Soccer",
    left: {
      team: "England",
      image:
        "https://media.itsfogo.com/media/upload/live/participants/4/2_234381_0.png",
      score: 1,
    },
    right: {
      team: "Slovakia",
      image:
        "https://media.itsfogo.com/media/upload/live/participants/4/2_234372_0.png",
      score: 0,
    },
    odds: {
      left: {
        odds: 1.5,
        movement: 0.1,
      },
      draw: {
        odds: 2.5,
        movement: 0.1,
      },
      right: {
        odds: 3.5,
        movement: 0.1,
      },
    },
  },
  {
    competition: "Euro 2024",
    elapsed: 45,
    status: "Tomorrow, 20:00",
    kind: "Soccer",
    left: {
      team: "Portugal",
      image:
        "https://media.itsfogo.com/media/upload/live/participants/4/2_234390_0.png",
      score: 1,
    },
    right: {
      team: "Slovenia",
      image:
        "https://media.itsfogo.com/media/upload/live/participants/4/2_234355_0.png",
      score: 0,
    },
    odds: {
      left: {
        odds: 1.71,
        movement: 0.1,
      },
      draw: {
        odds: 2.0,
        movement: 0.1,
      },
      right: {
        odds: 4.2,
        movement: 0.1,
      },
    },
  },
  {
    competition: "Euro 2024",
    elapsed: 45,
    status: "Tomorrow, 20:00",
    kind: "Soccer",
    left: {
      team: "Spain",
      image:
        "https://media.itsfogo.com/media/upload/live/participants/4/2_234342_0.png",
      score: 1,
    },
    right: {
      team: "Georgia",
      image:
        "https://media.itsfogo.com/media/upload/live/participants/4/2_234387_0.png",
      score: 0,
    },
    odds: {
      left: {
        odds: 1.2,
        movement: 0.1,
      },
      draw: {
        odds: 6.75,
        movement: 0.1,
      },
      right: {
        odds: 12.5,
        movement: 0.1,
      },
    },
  },
  {
    competition: "Euro 2024",
    elapsed: 45,
    status: "Tomorrow, 20:00",
    kind: "Soccer",
    left: {
      team: "France",
      image:
        "https://media.itsfogo.com/media/upload/live/participants/4/2_197647_0.png",
      score: 1,
    },
    right: {
      team: "Belgium",
      image:
        "https://media.itsfogo.com/media/upload/live/participants/4/2_234389_0.png",
      score: 0,
    },
    odds: {
      left: {
        odds: 1.5,
        movement: 0.1,
      },
      draw: {
        odds: 2.5,
        movement: 0.1,
      },
      right: {
        odds: 3.5,
        movement: 0.1,
      },
    },
  },
  {
    competition: "Copa America 2024",
    elapsed: 45,
    status: "Tomorrow, 20:00",
    kind: "Soccer",
    left: {
      team: "USA",
      image:
        "https://media.itsfogo.com/media/upload/live/participants/4/2_204848_0.png",
      score: 1,
    },
    right: {
      team: "Uruguay",
      image:
        "https://media.itsfogo.com/media/upload/live/participants/4/2_234212_0.png",
      score: 0,
    },
    odds: {
      left: {
        odds: 1.5,
        movement: 0.1,
      },
      draw: {
        odds: 2.5,
        movement: 0.1,
      },
      right: {
        odds: 3.5,
        movement: 0.1,
      },
    },
  },
];

function Entryv2(match: IMatchv2) {
  const { bets: [, setBets], show: [, setShow] } = useAppContext();

  const addToBetSlip = (choice: "left" | "right" | "draw") => {
    const bet = {
      id: hashBet({
        date: new Date(),
        title: `${match.left.team} vs ${match.right.team}`,
      }),
      chosen: choice === "draw" ? "Draw" : match[choice].team,
      bet: "1x2",
      match: `${match.left.team} vs ${match.right.team}`,
      odds: match.odds[choice].odds,
    };
    setBets((bets) => [bet, ...bets]);
    setShow(true);
  };

  return (
    <div className="w-full shadow-md rounded-lg p-4 border border-neutral-700 flex-grow-0 flex-shrink-0 flex-col bg-gray-800  transition-colors duration-300 flex gap-3">
      <div className="flex justify-between flex-row items-center">
        <div className="flex flex-row gap-2 items-center justify-center">
          {getIcon(match.competition)}
          <p className="text-neutral-400 text-sm">{match.competition}</p>
        </div>
        <FaGear className="text-neutral-400" />
      </div>
      <div className="flex flex-col gap-3 justify-between items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-row gap-3 items-center">
            <img
              src={match.left.image}
              alt={match.left.team}
              className="w-7 h-7"
            />
            <p className="text-white">{match.left.team}</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-row gap-3 items-center">
            <img
              src={match.right.image}
              alt={match.right.team}
              className="w-7 h-7"
            />
            <p className="text-white">{match.right.team}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div
          onClick={() => addToBetSlip("left")}
          className="py-1 px-2 rounded-md bg-gray-900 flex justify-between items-center w-1/3 hover:bg-gray-700 hover:rounded-md transition-colors duration-300"
        >
          <p className="text-neutral-300 text-sm">{match.left.team}</p>
          <div className="flex flex-row items-center justify-between gap-1">
            <p className="text-white">{match.odds.left.odds}</p>
          </div>
        </div>
        <div
          onClick={() => addToBetSlip("draw")}
          className="py-1 px-2 rounded-md bg-gray-900 flex justify-between items-center w-1/3 hover:bg-gray-700 hover:rounded-md transition-colors duration-300"
        >
          <p className="text-neutral-300 text-sm">Draw</p>
          <div className="flex flex-row items-center justify-between gap-1">
            <p className="text-white">{match.odds.draw.odds}</p>
          </div>
        </div>
        <div
          onClick={() => addToBetSlip("right")}
          className="py-1 px-2 rounded-md bg-gray-900 flex justify-between items-center w-1/3 hover:bg-gray-700 hover:rounded-md transition-colors duration-300"
        >
          <p className="text-neutral-300 text-sm">{match.right.team}</p>
          <div className="flex flex-row items-center justify-evenly gap-1">
            <p className="text-white">{match.odds.right.odds}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeadToHead() {
  return (
    <div className="flex flex-col mx-3 gap-3 text-xs">
      <div className="flex flex-row gap-1 items-center">
        <FaBolt className="text-bb-accent inline-block" />
        <h1 className="text-white font-bold mx-1 font-just text-sm">
          Head to Head
        </h1>
      </div>
      <div className="flex flex-col overflow-x-scroll gap-2 no-scrollbar ">
        {matchesv2.map((match, index) => <Entryv2 key={index} {...match} />)}
      </div>
    </div>
  );
}
