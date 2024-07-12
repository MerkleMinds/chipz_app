"use client";

import Drawer, { IDrawerProps } from "@/components/events/Drawer";

import Accordion from "@/components/events/Accordion";
import { FaPerson } from "react-icons/fa6";
import { StateTuple } from "../Context";
import { useState } from "react";

interface IPlayer {
  name: string;
}

interface IPlayerMenuProps {
  players: [IPlayer, ...IPlayer[]];
  tuple: StateTuple<IPlayer>;
}

function PlayerMenu({ players, tuple }: IPlayerMenuProps) {
  return (
    <div className="flex overflow-x-scroll no-scrollbar py-2 gap-2 text-white text-sm mx-2 rounded-md">
      {players.map((
        player,
        index,
      ) => (
        <div
          key={`menu-${player.name}-${index}`}
          onClick={() => tuple[1](player)}
          className={`flex items-center flex-row gap-2 justify-center px-4 py-2 bg-gray-800 rounded-md border border-neutral-700 ${
            player.name === tuple[0].name ? "bg-gray-600" : ""
          } transition-colors duration-200 cursor-pointer`}
        >
          <FaPerson />
          <p className="whitespace-nowrap">{player.name}</p>
        </div>
      ))}
    </div>
  );
}

export interface IPlayerProps {
  team: string;
  players: [IPlayer, ...IPlayer[]];
}

const willPlayerScoreData: IDrawerProps["boxes"] = {
  sections: [
    {
      key: "Full Time",
      data: [
        { name: "Yes", odds: 1.5 },
        { name: "No", odds: 2.2 },
      ],
    },
    {
      key: "1st Half",
      data: [
        { name: "Yes", odds: 1.8 },
        { name: "No", odds: 2.9 },
      ],
    },
    {
      key: "2nd Half",
      data: [
        { name: "Yes", odds: 1.4 },
        { name: "No", odds: 2.8 },
      ],
    },
  ],
};

export default function Players({ team, players }: IPlayerProps) {
  const [player, setPlayer] = useState<IPlayer>(players[0]);

  return (
    <Accordion title={`Player - ${team}`} arrow>
      <div className="flex flex-col gap-2 pt-1 pb-4">
        <div className="mx-2">
          <PlayerMenu
            players={players}
            tuple={[player, setPlayer]}
          />
        </div>
        <Drawer
          title={`Will ${player.name} score?`}
          boxes={willPlayerScoreData}
        />
        <Drawer
          title={`Will ${player.name} assist?`}
          boxes={willPlayerScoreData}
        />
        <Drawer
          title={`Will ${player.name} get a card?`}
          boxes={willPlayerScoreData}
        />
        <Drawer
          title={`Will ${player.name} be substituted?`}
          boxes={willPlayerScoreData}
        />
      </div>
    </Accordion>
  );
}
