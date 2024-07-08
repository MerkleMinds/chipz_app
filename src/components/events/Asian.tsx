"use client";

import { hashBet } from "@/components/bets/Betv2";
import { useAppContext } from "@/components/Context";

interface IAsianProps {
  team: string;
  choices: {
    left: {
      odds: number;
      description: string;
    };
    middle: {
      odds: number;
      description: string;
    };
    right: {
      odds: number;
      description: string;
    };
  };
}

export default function Asian(team: IAsianProps) {
  const { bets: [, setBets], show: [, setShow] } = useAppContext();

  const addToBetSlip = (choice: "left" | "middle" | "right") => {
    const key = team.choices[choice];
    const bet = {
      id: hashBet({
        date: new Date(),
        title: `${team.team} ${key.description}`,
      }),
      chosen: key.description,
      bet: "Asian",
      match: team.team,
      odds: key.odds,
    };
    setBets((prevBets) => [...prevBets, bet]);
    setShow(true);
  };

  return (
    <div className="flex justify-evenly items-center rounded-md p-2 mb-3 bg-gray-900">
      <div
        className="flex flex-row items-center gap-2 justify-center min-w-0 max-w-xs hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300"
        onClick={() => addToBetSlip("left")}
      >
        <p className="text-neutral-400">{team.choices.left.description}</p>
        <p className="font-bold text-white">{team.choices.left.odds}</p>
      </div>
      <div className="h-6 w-px bg-white mx-2"></div>
      <div
        className="flex flex-row items-center gap-2 justify-center min-w-0 max-w-xs hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300"
        onClick={() => addToBetSlip("middle")}
      >
        <p className="text-neutral-400">{team.choices.middle.description}</p>
        <p className="font-bold text-white">{team.choices.middle.odds}</p>
      </div>
      <div className="h-6 w-px bg-white mx-2"></div>
      <div
        className="flex flex-row items-center gap-2 justify-center min-w-0 max-w-xs hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300"
        onClick={() => addToBetSlip("right")}
      >
        <p className="text-neutral-400">{team.choices.right.description}</p>
        <p className="font-bold text-white">{team.choices.right.odds}</p>
      </div>
    </div>
  );
}
