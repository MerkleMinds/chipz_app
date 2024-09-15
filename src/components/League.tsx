"use client";
import { perform, populate } from "@/utils/client";
import { ExtractFrom } from "@/utils/types";
import { useEffect, useState } from "react";
import { FaAnglesRight, FaSpinner, FaTrophy } from "react-icons/fa6";

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

export default function League() {
  const [competitions, setCompetitions] = useState<
    ExtractFrom<"all_events", "data"> | null
  >();

  useEffect(() => {
    perform("all_events").then(populate(setCompetitions));
  }, []);

  if (!competitions) {
    return (
      <div className="h-[157px] flex items-center justify-center border border-neutral-500 rounded-md mx-3 mt-3">
        <FaSpinner className="animate-spin text-bb-accent mx-auto" />
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-3 mt-3 gap-3 text-xs">
      <div className="flex flex-row gap-1 items-center">
        <FaTrophy className="text-bb-accent inline-block" />
        <h1 className="text-white font-bold mx-1 font-just text-sm">
          Competitions
        </h1>
      </div>
      <div className="flex overflow-x-scroll gap-3 no-scrollbar">
        {competitions["competitions"].map((item, index) => (
          <Card
            key={`league-${index}`}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
