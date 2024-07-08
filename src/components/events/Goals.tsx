"use client";

import { hashBet } from "@/components/bets/Betv2";
import { useAppContext } from "@/components/Context";

interface IGoalsProps {
  amount: number;
  over: number;
  under: number;
}

export default function Goals(goal: IGoalsProps) {
  const { bets: [, setBets], show: [, setShow] } = useAppContext();

  const addToBetslip = (chosen: string, odds: number) => {
    setBets((bets) => [
      ...bets,
      {
        id: hashBet({
          date: new Date(),
          title: `${goal.under} vs ${goal.over}`,
        }),
        chosen,
        bet: "Goals",
        match: `${goal.under} vs ${goal.over}`,
        odds: +odds,
      },
    ]);
    setShow(true);
  };

  return (
    <div className="flex justify-evenly items-center rounded-md p-2 mb-3 bg-gray-900">
      <div
        className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300"
        onClick={() => addToBetslip("under", goal.under)}
      >
        <p className="text-neutral-400">U{goal.amount}</p>
        <p className="font-bold text-white">{goal.under}</p>
      </div>
      <div className="h-6 w-px bg-white mx-2"></div>
      <div
        className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300"
        onClick={() => addToBetslip("over", goal.over)}
      >
        <p className="text-neutral-400">O{goal.amount}</p>
        <p className="font-bold text-white">{goal.over}</p>
      </div>
    </div>
  );
}
