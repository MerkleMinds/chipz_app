"use client";

import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { MenuState } from "@/components/bets/Menu";
import crypto from "crypto";
import { useState } from "react";
import { formatBetAmount } from "@/config/betting";

type BetBasev2 = {
  title: string;
  bet: string;
  competition: string;
  date: Date;
  stake: number;
  odds: number;
  potential: number;
  eventId?: string; // ID for linking to event details
};

export type IBetv2 =
  & BetBasev2
  & (
    | {
      kind: MenuState.OPEN;
    }
    | {
      kind: MenuState.SETTLED;
      result: "win" | "lose" | "cancel" | "cashout";
    }
  );

export const hashBet = ({ date, title }: { date: Date; title: string }) =>
  crypto
    .createHash("sha256")
    .update(`${date.toISOString()}${title}`)
    .digest("hex")
    .slice(0, 16);

export default function Betv2(props: IBetv2) {
  const router = useRouter();
  const [closed, setClosed] = useState<boolean>(true);
  
  // Navigate to event details page
  const navigateToEvent = () => {
    if (props.eventId) {
      // Check if eventId is valid before navigating
      if (props.eventId.startsWith('ev-')) {
        router.push(`/events/${props.eventId}`);
      } else {
        // For bets created from local storage that might have invalid event IDs
        console.log('Invalid event ID format:', props.eventId);
      }
    }
  };

  return (
    <div 
      className="rounded-md bg-gray-800 flex flex-col w-full transition-all px-4 py-2 cursor-pointer hover:bg-gray-700"
      onClick={navigateToEvent}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-sm font-bold">{props.bet}</div>
          {props.kind === MenuState.SETTLED && (
            <div
              className={`text-sm text-white rounded-sm px-2 ${
                props.result === "win" || props.result === "cashout"
                  ? "bg-green-500"
                  : props.result === "lose"
                  ? "bg-neutral-400"
                  : "bg-black"
              }`}
            >
              {props.result === "win"
                ? "won"
                : props.result === "lose"
                ? "lost"
                : props.result === "cancel"
                ? "cancelled"
                : "cashout"}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col my-2">
        <p className="text-neutral-400 text-xs">{props.title}</p>
        <p className="text-neutral-400 text-xs">
          {props.date.toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-row justify-between my-2">
        <div className="flex flex-col items-center justify-center">
          <p className="text-neutral-400 text-xs">Stake</p>
          <p className="text-white text-sm">{formatBetAmount(props.stake) + " $"}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-neutral-400 text-xs">Odds</p>
          <p className="text-white text-sm">{props.odds}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-neutral-400 text-xs">
            {props.kind === MenuState.SETTLED ? "Winnings" : "Potential"}
          </p>
          <p
            className={`text-sm ${
              props.kind === MenuState.SETTLED
                ? props.result === "win" ? "text-green-500" : "text-neutral-400"
                : "text-white"
            }`}
          >
            {props.kind === MenuState.SETTLED
              ? props.result === "lose" ? "-" : formatBetAmount(props.potential) + " $"
              : formatBetAmount(props.potential) + " $"}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="h-0.5 w-full bg-neutral-400 rounded-md"></div>
      </div>
      <div className="flex items-center justify-end">
        <div
          className="flex flex-row gap-2 items-center justify-center m-2"
          onClick={() => setClosed((c) => !c)}
        >
          <p className="text-neutral-400 text-xs">Details</p>
          {closed
            ? <FaChevronDown className="text-neutral-400 text-xs" />
            : <FaChevronUp className="text-neutral-400 text-xs" />}
        </div>
      </div>
      {!closed && (
        <div className="flex flex-row justify-between items-center m-2">
          <div className="text-neutral-400 text-xs">
            {props.date.toLocaleString()}
          </div>
          <div className="text-neutral-400 text-xs">
            ID: {hashBet({ date: props.date, title: props.title })}
          </div>
        </div>
      )}
    </div>
  );
}
