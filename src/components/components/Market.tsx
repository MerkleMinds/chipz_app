"use client";

// import { redirect, useRouter } from "next/navigation";}

import { CiBookmark } from "react-icons/ci";
import { IconContext } from "react-icons";

export type MarketItem = {
  id: string;
  title: string;
  probability: number;
  totalVolume: string;
  imageUrl: string;
};

interface IBoxProps {
  markets: MarketItem[];
}

const HalfCircleProgress = ({ probability }: { probability: number }) => {
  const radius = 30;
  const circumference = Math.PI * radius;
  const progress = (probability / 100) * circumference;
  const color = probability > 45 ? "green" : "red";

  return (
    <div className="relative w-[64px] h-[48px]">
      <svg width="64" height="32" viewBox="0 0 64 32">
        <circle
          cx="32"
          cy="32"
          r={radius * 0.8}
          fill="none"
          stroke="#555"
          strokeWidth="5"
          strokeDasharray={circumference * 1.6}
          strokeDashoffset="0"
        />
        <circle
          cx="32"
          cy="32"
          r={radius * 0.8}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={circumference * 0.8}
          strokeDashoffset={circumference - progress * 0.8}
          strokeLinecap="round"
          transform="rotate(180, 32, 32)"
        />
      </svg>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-[10px] font-bold">
        {probability}%
      </div>
      <div className="absolute top-[65%] left-[50%] translate-x-[-50%] text-[8px] text-gray-300">
        chance
      </div>
    </div>
  );
};

export default function MarketBox({ markets }: IBoxProps) {
  return (
    <div className="flex flex-col space-y-4">
      {markets.map((market) => (
        <div
          key={market.id}
          className="w-full h-[200px] p-5 flex flex-col justify-between border border-neutral-700 rounded-xl bg-gray-800"
        >
          <div>
            <div className="flex items-center space-x-3">
              <img
                src={market.imageUrl}
                alt="flag"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex justify-between grow">
                <div className="flex w-[60%] mr-auto items-center">
                  <p className="text-white font-bold text-xs">{market.title}</p>
                </div>
                <HalfCircleProgress probability={market.probability} />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mt-4">
              <button className="bg-[#6BD932] px-4 py-2 mr-[5px] text-white rounded-lg font-bold flex-1 text-xs">
                Buy Yes ↑
              </button>
              <button className="bg-[#FE4E4F] px-4 py-2 ml-[5px] text-white rounded-lg font-bold flex-1 text-xs">
                Buy No ↓
              </button>
            </div>
            <div className="flex flex-row justify-between mt-3">
              <p className="text-gray-400 text-[0.65rem]">{market.totalVolume} Vol.</p>
              <IconContext.Provider
                value={{ className: "text-white text-xl font-bold" }}
              >
                <CiBookmark className="text-[14px]" />
              </IconContext.Provider>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
