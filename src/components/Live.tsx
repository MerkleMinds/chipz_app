"use client";

import {
  FaBasketball,
  FaBolt,
  FaChartLine,
  FaChevronDown,
  FaChevronUp,
  FaFootball,
  FaFutbol,
  FaGear,
  FaQuestion,
  FaSpinner,
} from "react-icons/fa6";

import { hashBet } from "@/components/bets/Betv2";
import { useAppContext } from "@/components/Context";
import { perform, populate } from "@/utils/client";
import { ExtractFrom } from "@/utils/types";
import { useState, useEffect } from "react";
import Image from "next/image";

export interface IMatchv2 {
  competition: string;
  elapsed: number;
  status: string;
  kind: string;
  left: {
    team: string;
    image: string;
    score: number;
  };
  right: {
    team: string;
    image: string;
    score: number;
  };
  odds: {
    left: {
      odds: number;
      movement: number;
    };
    draw: {
      odds: number;
      movement: number;
    };
    right: {
      odds: number;
      movement: number;
    };
  };
}

const competitionIcons: {
  [key: string]: JSX.Element;
} = {
  "Euro 2024": <FaFutbol className="text-neutral-400" />,
  "NFL 2024": <FaFootball className="text-neutral-400" />,
  "NBA 2024": <FaBasketball className="text-neutral-400" />,
  "Copa America 2024": <FaFutbol className="text-neutral-400" />,
};

export const getIcon = (competition: string) => {
  if (!(competition in competitionIcons)) {
    return <FaQuestion className="text-neutral-400" />;
  }

  return competitionIcons[competition];
};

function Card(match: IMatchv2) {
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
    <div className="w-full shadow-md rounded-lg p-4 border border-neutral-700 flex-grow-0 flex-shrink-0 flex-col bg-gray-800  transition-colors duration-300 flex gap-1">
      <div className="flex justify-between flex-row items-center">
        <div className="flex flex-row gap-2 items-center justify-center">
          {getIcon(match.competition)}
          <p className="text-neutral-400 text-sm">{match.competition}</p>
        </div>
        <FaGear className="text-neutral-400" />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <FaBolt className="text-bb-accent" />
        <p className="text-bb-accent text-sm">
          {match.elapsed}&apos; - {match.status}
        </p>
      </div>
      <div className="flex flex-col gap-3 justify-between items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-row gap-3 items-center">
            <Image
              src={match.left.image}
              alt={match.left.team}
              width={28}
              height={28}
              className="object-contain"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7yQCgAAAABJRU5ErkJggg=="
            />
            <p className="text-white">{match.left.team}</p>
          </div>
          <span className="py-1 px-3 rounded-md bg-gray-900 text-white font-mono">
            {match.left.score}
          </span>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-row gap-3 items-center">
            <Image
              src={match.right.image}
              alt={match.right.team}
              width={28}
              height={28}
              className="object-contain"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7yQCgAAAABJRU5ErkJggg=="
            />
            <p className="text-white">{match.right.team}</p>
          </div>
          <span className="py-1 px-3 rounded-md bg-gray-900 text-white font-mono">
            {match.right.score}
          </span>
        </div>
      </div>
      <p className="text-neutral-400 text-sm my-2 mb-1">{match.kind}</p>
      <div className="flex items-center justify-between gap-2">
        <div
          onClick={() => addToBetSlip("left")}
          className="py-1 px-2 rounded-md bg-gray-900 flex justify-between items-center w-1/3 hover:bg-gray-700 hover:rounded-md transition-colors duration-300"
        >
          <p className="text-neutral-300 text-sm">{match.left.team}</p>
          <div className="flex flex-row items-center justify-between gap-1">
            <p className="text-white">{match.odds.left.odds}</p>
            {match.odds.left.movement > 0
              ? <FaChevronUp size={10} className="text-bb-success" />
              : <FaChevronDown size={10} className="text-bb-error" />}
          </div>
        </div>
        <div
          onClick={() => addToBetSlip("draw")}
          className="py-1 px-2 rounded-md bg-gray-900 flex justify-between items-center w-1/3 hover:bg-gray-700 hover:rounded-md transition-colors duration-300"
        >
          <p className="text-neutral-300 text-sm">Draw</p>
          <div className="flex flex-row items-center justify-between gap-1">
            <p className="text-white">{match.odds.draw.odds}</p>
            {match.odds.draw.movement > 0
              ? <FaChevronUp size={10} className="text-bb-success" />
              : <FaChevronDown size={10} className="text-bb-error" />}
          </div>
        </div>
        <div
          onClick={() => addToBetSlip("right")}
          className="py-1 px-2 rounded-md bg-gray-900 flex justify-between items-center w-1/3 hover:bg-gray-700 hover:rounded-md transition-colors duration-300"
        >
          <p className="text-neutral-300 text-sm">{match.right.team}</p>
          <div className="flex flex-row items-center justify-evenly gap-1">
            <p className="text-white">{match.odds.right.odds}</p>
            {match.odds.right.movement > 0
              ? <FaChevronUp size={10} className="text-bb-success" />
              : <FaChevronDown size={10} className="text-bb-error" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Live() {
  const [live, setLive] = useState<
    ExtractFrom<"all_events", "data"> | null
  >();

  useEffect(() => {
    perform("all_events").then(populate(setLive));
  }, []);

  if (!live) {
    return (
      <div className="h-[150px] flex items-center justify-center border border-neutral-500 rounded-md mx-3 mt-3">
        <FaSpinner className="animate-spin text-bb-accent mx-auto" />
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-3 gap-3 text-xs">
      <div className="flex flex-row gap-1 items-center">
        <FaChartLine className="text-bb-accent inline-block" />
        <h1 className="text-white font-bold mx-1 font-just text-sm">Live</h1>
      </div>
      <div className="flex overflow-x-scroll gap-3 no-scrollbar ">
        {live["live"].map((match, index) => (
          <Card key={`live-${index}`} {...match} />
        ))}
      </div>
    </div>
  );
}
