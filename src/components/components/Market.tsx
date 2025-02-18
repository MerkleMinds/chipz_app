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
        <div className="relative w-[80px] h-[60px]">
            <svg width="80" height="40" viewBox="0 0 80 40">
                <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke="#555"
                    strokeWidth="6"
                    strokeDasharray={circumference * 2}
                    strokeDashoffset="0"
                />

                <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    transform="rotate(180, 40, 40)"
                />
            </svg>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-sm font-bold">
                {probability}%
            </div>
            <div className="absolute top-[65%] left-[50%] translate-x-[-50%] text-xs text-gray-300">
                chance
            </div>
        </div>
    );
};

export default function MarketBox({ markets }: IBoxProps) {
    return (
        <div className="flex flex-col space-y-4">
            {markets.map((market) => (
                <div key={market.id} className="w-full h-[200px] p-5 flex flex-col justify-between border border-neutral-700 rounded-xl bg-gray-800">
                    <div>
                        <div className="flex items-center space-x-3">
                            <img src={market.imageUrl} alt="flag" className="w-8 h-8 rounded-full" />
                            <p className="text-white font-bold">{market.title}</p>
                            <HalfCircleProgress probability={market.probability} />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button className="bg-[#6BD932] px-4 py-2 mr-[5px] text-white rounded-lg font-bold flex-1">Buy Yes ↑</button>
                            <button className="bg-[#FE4E4F] px-4 py-2 ml-[5px] text-white rounded-lg font-bold flex-1">Buy No ↓</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <p className="text-gray-400 text-sm">{market.totalVolume} Vol.</p>
                        <IconContext.Provider value={{ className: "text-white text-xl font-bold" }} >
                            <CiBookmark />
                        </IconContext.Provider>
                    </div>
                </div>
            ))}
        </div>
    );
}

