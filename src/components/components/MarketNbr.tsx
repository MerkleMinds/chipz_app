"use client";

import { CiBookmark } from "react-icons/ci";
import { IconContext } from "react-icons";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export type MarketNbrItem = {
    id: string;
    title: string;
    imageUrl: string;
    totalVolume: number;
    options: { name: string; probability: number }[];
};

export type MarketNbrBoxProps = {
    markets: MarketNbrItem[];
};

export type MarketSelectionItem = {
    id: string;
    title: string;
    imageUrl: string;
    multiplier: number;
    betType: "yes" | "no";
};

export type BuyBoxProps = {
    selections: MarketSelectionItem[];
};

function MarketPrices({ marketData, onSelect }: { marketData: MarketNbrItem["options"], onSelect: (betType: "yes" | "no") => void }) {
    return (
        <div className="flex flex-col w-full">
            {marketData.map((option, index) => (
                <div key={index} className="flex justify-between items-center my-1">
                    <p className="text-white text-xs">{option.name}</p>
                    <div className="flex items-center">
                        <p className="text-white font-bold text-xs">{option.probability}%</p>
                        <div className="flex gap-x-2 ml-3">
                            <button onClick={() => onSelect("yes")} className="bg-[#6BD932] text-white text-xs w-[35px] py-2 rounded text-center">Yes</button>
                            <button onClick={() => onSelect("no")} className="bg-[#FE4E4F] text-white text-xs w-[35px] py-2 rounded text-center">No</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function BuyAmountControl({ selection }: { selection: MarketSelectionItem }) {
    const [amount, setAmount] = useState(10);

    const handleAmountChange = (value: number) => {
        if (value >= 1) setAmount(value);
    };

    return (
        <div className="mt-4">
            <div className="bg-gray-800 rounded-lg flex items-center justify-between py-[7px] px-[10px]">
                <span className="text-lg">$</span>
                <input
                    type="number"
                    value={amount}
                    min="1"
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className="bg-transparent text-white text-lg w-full text-center focus:outline-none"
                />
                <div className="flex space-x-2">
                    <button onClick={() => handleAmountChange(amount + 1)} className="bg-gray-700 px-2 py-1 rounded">
                        +1
                    </button>
                    <button onClick={() => handleAmountChange(amount + 10)} className="bg-gray-700 px-2 py-1 rounded">
                        +10
                    </button>
                </div>
            </div>

            <input
                type="range"
                min="1"
                max="100"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                className="w-full mt-3 accent-purple-500"
            />

            <button className={`${selection.betType === "yes" ? "bg-[#6BD932]" : "bg-[#FE4E4F]"} text-white w-full py-3 rounded-lg text-lg mt-4 font-bold`}>
                Buy {selection.betType === "yes" ? "Yes" : "No"}
                <p className="text-sm font-normal">
                    To win ${(amount * selection.multiplier).toFixed(2)}
                </p>
            </button>
        </div>
    );
}

function OnBuyClickBox({ selection, onClose }: { selection: MarketSelectionItem, onClose: () => void }) {
    return (
        <div className="text-white p-5 border border-neutral-700 rounded-xl bg-gray-800">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src={selection.imageUrl} alt="Event" className="w-6 h-6 rounded-full" />
                    <p className="font-semibold">{selection.title}</p>
                </div>
                <button className="text-gray-400 hover:text-white" onClick={onClose}>
                    <IoClose size={18} />
                </button>
            </div>
            <BuyAmountControl selection={selection} />
        </div>
    );
}

export default function MarketNbrBox({ markets }: MarketNbrBoxProps) {
    const [selectedMarket, setSelectedMarket] = useState<MarketSelectionItem | null>(null);

    const handleSelect = (market: MarketNbrItem, betType: "yes" | "no") => {
        setSelectedMarket({
            id: market.id,
            title: market.title,
            imageUrl: market.imageUrl,
            multiplier: 2, // You can adjust this based on actual data
            betType
        });
    };

    return (
        <div className="flex flex-col space-y-4 justify-center">
            {markets.map((market) => (
                <div key={market.id} className="p-5 w-full border border-neutral-700 rounded-xl bg-gray-800">
                    <div>
                        <div className="flex items-center space-x-3">
                            <img src={market.imageUrl} alt="flag" className="w-8 h-8 rounded-full" />
                            <p className="text-white font-bold text-xs">{market.title}</p>
                        </div>
                        <div className="mt-4">
                            {selectedMarket?.id === market.id ? (
                                <OnBuyClickBox selection={selectedMarket} onClose={() => setSelectedMarket(null)} />
                            ) : (
                                <MarketPrices marketData={market.options} onSelect={(betType) => handleSelect(market, betType)} />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-end mt-3">
                        <p className="text-gray-400 text-[0.65rem]">{market.totalVolume} Vol.</p>
                        <IconContext.Provider value={{ className: "text-white text-xl font-bold" }}>
                            <CiBookmark className="text-[14px]" />
                        </IconContext.Provider>
                    </div>
                </div>
            ))}
        </div>
    );
}
