"use client";

import Accordion from "@/components/events/Accordion";
import { hashBet } from "@/components/bets/Betv2";
import { useAppContext } from "@/components/Context";
import { useState } from "react";

export interface IDrawerProps {
  title: string;
  boxes: {
    sections: {
      key: string;
      data: {
        name: string;
        odds: number;
      }[];
    }[];
  };
  active?: boolean;
}

export default function Drawer({ title, boxes, active = false }: IDrawerProps) {
  const [selected, setSelected] = useState<string>(boxes.sections[0].key);
  const currentSection = boxes.sections.find((section) =>
    section.key === selected
  );

  const { bets: [, setBets], show: [, setShow] } = useAppContext();

  if (!currentSection) {
    return null;
  }

  return (
    <Accordion title={title} active={active}>
      <div className="flex flex-col gap-2 m-4 mt-2">
        <div className="flex flex-row text-sm gap-2">
          {boxes.sections.map((section, index) => (
            <p
              key={`section-${section.key}-${index}`}
              className={`bg-gray-800 p-2 rounded-md transition-all duration-200 ease-in-out cursor-pointer ${
                selected === section.key
                  ? "text-white underline decoration-gray-400 decoration-2 underline-offset-2"
                  : "text-neutral-400"
              }`}
              onClick={() => setSelected(section.key)}
            >
              {section.key}
            </p>
          ))}
        </div>
        <div className="border border-gray-700 rounded-md flex items-center flex-row justify-center divide-x divide-neutral-400">
          {currentSection.data.map((section, index) => (
            <div
              onClick={() => {
                setBets((prev) => [
                  ...prev,
                  {
                    id: hashBet({ date: new Date(), title }),
                    chosen: title,
                    bet: section.name,
                    match: title,
                    odds: section.odds,
                  },
                ]);
                setShow(true);
              }}
              key={`bet-${section.name}-${index}`}
              className="w-full p-2 text-neutral-400 flex items-center justify-evenly hover:bg-gray-700 transition-all duration-200 ease-in-out cursor-pointer"
            >
              <p className="text-xs truncate">
                {section.name}
                {" "}
              </p>
              <span className="text-white text-sm">
                {section.odds}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Accordion>
  );
}
