"use client";

import Checkout from "@/components/bets/Checkout";
import { IBet } from "@/components/bets/Bet";

const bets: IBet[] = [
  {
    name: "Euro 2024",
    chosen: "Spain",
    odds: 3.2,
    matchup: "Spain vs. Italy",
    kind: "Main",
    description: "Spain to win at full time",
  },
];

interface ISlipProps {
  fn: () => void;
}

export default function Slip({ fn }: ISlipProps) {
  return (
    <div className="z-[150] w-full h-full">
      <Checkout bets={bets} callback={fn} />
    </div>
  );
}
