"use client";

import { CiBookmark } from "react-icons/ci";
import { IconContext } from "react-icons";

export type MarketNbrItem = {
    id: string;
    title: string;
    totalVolume: string;
    imageUrl: string;
    options: [
        {
            name: string,
            probability: number
        }
    ]
};

interface MarketNbrBoxProps {
    markets: MarketNbrItem[];
}

const MarketPrices = ({ marketData }: { marketData: MarketNbrItem["options"] }) => {
    return (
        <div className="flex flex-col w-full">
            {marketData.map((option, index) => (
                <div key={index} className="flex justify-between items-center my-1">
                    <p className="text-white">{option.name}</p>
                    <div className="flex items-center">
                        <p className="text-white font-bold">{option.probability}%</p>
                        <button className="bg-[#6BD932] text-white px-2 py-1 ml-3 rounded">Yes</button>
                        <button className="bg-[#FE4E4F] text-white px-2 py-1 ml-2 rounded">No</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function MarketNbrBox({ markets }: MarketNbrBoxProps) {
    return (
        <div className="flex flex-col space-y-4 justify-center">
            {markets.map((market) => (
                <div key={market.id} className="bg-gray-900 p-5 rounded-lg ring-2 ring-white w-full">
                    <div>
                        <div className="flex items-center space-x-3">
                            <img src={market.imageUrl} alt="flag" className="w-8 h-8 rounded-full" />
                            <p className="text-white font-bold">{market.title}</p>
                        </div>
                        <div className="mt-4">
                            <MarketPrices marketData={market.options} />
                        </div>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <p className="text-gray-400 text-sm">{market.totalVolume} Vol.</p>
                        <IconContext.Provider value={{ className: "text-white text-xl font-bold" }}>
                            <CiBookmark />
                        </IconContext.Provider>
                    </div>
                </div>
            ))}
        </div>
    );
}
