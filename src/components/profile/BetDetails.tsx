"use client";

import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import crypto from "crypto";
import { useState } from "react";

export type BetBasev2 = {
  title: string;
  bet: string;
  competition: string;
  date: Date;
  stake: number;
  odds: number;
  potential: number;
  result?: "win" | "lose" | "cancel" | "cashout";
  status?: "live" | "open" | "settled";
};

export const hashBet = ({ date, title }: { date: Date; title: string }) =>
  crypto
    .createHash("sha256")
    .update(`${date.toISOString()}${title}`)
    .digest("hex")
    .slice(0, 16);

export default function BetDetails(props: BetBasev2) {
  const [closed, setClosed] = useState<boolean>(true);

  return (
    <div className="rounded-md bg-bb-bg-card flex flex-col w-full transition-all px-4 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <div className="text-white text-sm">{props.title} - {props.bet}</div>
          {props.result && (
            <div
              className={`text-sm rounded-sm px-2 border border-md ${
                props.result === "win" || props.result === "cashout"
                  ? "text-bb-success border-bb-success"
                  : props.result === "lose"
                  ? "text-bb-error border-bb-error"
                  : "bg-black"
              }`}
            >
              {props.result}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col my-2">
        <p className="text-neutral-400 text-xs">{props.competition} - {props.date.toLocaleDateString()}</p>
      </div>
      <div className="flex flex-row justify-between my-2">
        <div className="flex flex-col justify-center">
          <p className="text-neutral-400 text-xs">Stake</p>
          <p className="text-neutral-400 text-sm">{props.stake + " $"}</p>
        </div>
        <div className="flex flex-col justify-center items-end">
          <p className="text-neutral-400 text-xs">
            {props.result ? "Earnings" : "Potential"}
          </p>
          <p
            className={`text-sm ${
              props.result
                ? props.result === "win"
                  ? "text-green-500"
                  : "text-neutral-400"
                : "text-white"
            }`}
          >
            {props.result === "lose" ? "-" : `${props.potential} $`}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="h-0.5 w-full bg-neutral-400 rounded-md"></div>
      </div>
      <div className="flex items-center justify-end">
        <div
          className="flex flex-row gap-1 items-center justify-center m-2"
          onClick={() => setClosed((c) => !c)}
        >
          <p className="text-neutral-400 text-[8px]">Details</p>
          {closed
            ? <FaChevronDown className="text-neutral-400 text-[8px]" />
            : <FaChevronUp className="text-neutral-400 text-[8px]" />}
        </div>
      </div>
      {!closed && (
        <div className="flex flex-row justify-between items-center m-2">
          <div className="text-neutral-400 text-[10px]">
            {props.date.toLocaleString()}
          </div>
          <div className="text-neutral-400 text-[10px]">
            ID: {hashBet({ date: props.date, title: props.title })}
          </div>
        </div>
      )}
    </div>
  );
}
