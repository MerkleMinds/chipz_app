"use client";
import { useState } from "react";
import Slip from "@/components/events/Slip";
import PopUp from "@/components/events/Popup";

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
  const [showSlip, setShowSlip] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {(showSlip || showPopup) && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-all duration-300"
          onClick={() => setShowSlip(false)}
        >
        </div>
      )}
      <div className="flex justify-evenly items-center rounded-md p-2 mb-3 bg-gray-900">
        <div
          onClick={() => setShowSlip(true)}
          className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300"
        >
          <p className="text-neutral-400">{home.name}</p>
          <p className="font-bold text-white">{home.odds}</p>
        </div>
        <div
          onClick={() => setShowSlip(true)}
          className="h-6 w-px bg-white mx-2"
        >
        </div>
        <div className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
          <p className="text-neutral-400">X</p>
          <p className="font-bold text-white">{draw.odds}</p>
        </div>
        <div
          onClick={() => setShowSlip(true)}
          className="h-6 w-px bg-white mx-2"
        >
        </div>
        <div className="flex flex-row items-center gap-2 justify-center hover:bg-gray-800 py-2 px-4 rounded-md transition-colors duration-300">
          <p className="text-neutral-400">{away.name}</p>
          <p className="font-bold text-white">{away.odds}</p>
        </div>
      </div>
      {showSlip && (
        <div className="fixed w-full left-0 bottom-0 mb-14 z-[155]">
          <Slip fn={() => (setShowPopup(true), setShowSlip(false))} />
        </div>
      )}
      {showPopup && <PopUp fn={() => setShowPopup(false)} />}
    </>
  );
}
