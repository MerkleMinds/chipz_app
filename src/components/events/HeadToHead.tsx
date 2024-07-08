"use client";

import { hashBet } from "@/components/bets/Betv2";
import { useAppContext } from "@/components/Context";

interface IHeadToHeadProps {
  home: {
    name: string;
    odds: string;
  };
  draw: {
    odds: string;
  };
  away: {
    name: string;
    odds: string;
  };
}

export default function HeadToHead({ home, draw, away }: IHeadToHeadProps) {
  const { bets: [, setBets], show: [, setShow] } = useAppContext();

  const addToBetslip = (chosen: string, odds: string) => {
    setBets((bets) => [
      ...bets,
      {
        id: hashBet({
          date: new Date(),
          title: `${home.name} vs ${away.name}`,
        }),
        chosen,
        bet: "1x2",
        match: `${home.name} vs ${away.name}`,
        odds: +odds,
      },
    ]);
    setShow(true);
  };

  return (
    <div className="flex justify-evenly items-center rounded-md p-2 mb-3 bg-gray-900">
      <div
        onClick={() => addToBetslip(home.name, home.odds)}
        className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300"
      >
        <p className="text-neutral-400">{home.name}</p>
        <p className="font-bold text-white">{home.odds}</p>
      </div>
      <div
        onClick={() => addToBetslip("Draw", draw.odds)}
        className="h-6 w-px bg-white mx-2"
      >
      </div>
      <div className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
        <p className="text-neutral-400">X</p>
        <p className="font-bold text-white">{draw.odds}</p>
      </div>
      <div
        onClick={() => addToBetslip(away.name, away.odds)}
        className="h-6 w-px bg-white mx-2"
      >
      </div>
      <div className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
        <p className="text-neutral-400">{away.name}</p>
        <p className="font-bold text-white">{away.odds}</p>
      </div>
    </div>
  );
}
