"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";

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

// New component to handle amount state for each item
function BuyAmountControl({ selection }: { selection: MarketSelectionItem }) {
    const [amount, setAmount] = useState(10);

    const handleAmountChange = (value: number) => {
        if (value >= 1) setAmount(value);
    };

    return (
        <div className="mt-4">
            {/* Input & Controls */}
            <div className="bg-gray-800 p-2 rounded-lg flex items-center justify-between">
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

            {/* Slider */}
            <input
                type="range"
                min="1"
                max="100"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                className="w-full mt-3 accent-purple-500"
            />

            {/* Buy Button */}
            <button className={`${selection.betType === "yes" ? "bg-green-600" : "bg-red-600"} text-white w-full py-3 rounded-lg text-lg mt-4 font-bold`}>
                Buy {selection.betType === "yes" ? "Yes" : "No"}
                <p className="text-sm font-normal">
                    To win ${(amount * selection.multiplier).toFixed(2)}
                </p>
            </button>
        </div>
    );
}

// Main component that maps through selections
export default function OnBuyClickBox({ selections }: BuyBoxProps) {
    return (
        <div className="flex flex-col justify-center space-y-4 my-6">
            {selections.map((selection) => (
                <div key={selection.id} className="bg-gray-900 text-white p-4 rounded-lg shadow-lg ring-2 ring-white">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <img src={selection.imageUrl} alt="Event" className="w-6 h-6 rounded-full" />
                            <p className="font-semibold">{selection.title}</p>
                        </div>
                        <button className="text-gray-400 hover:text-white">
                            <IoClose size={18} />
                        </button>
                    </div>

                    {/* Pass selection to BuyAmountControl */}
                    <BuyAmountControl selection={selection} />
                </div>
            ))}
        </div>
    );
}
