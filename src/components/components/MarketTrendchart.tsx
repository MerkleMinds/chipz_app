"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export type MarketTrendItem = {
    id: string;
    question: string;
    currentChance: number;
    chanceChange: string;
    historicalData: { date: string; chance: number }[];
};

export type MarketTrendProps = {
    trends: MarketTrendItem[];
};

export default function MarketTrendsBox({ trends }: MarketTrendProps) {
    const [selectedMarket, setSelectedMarket] = useState(trends[0]);
    const [timeFrame, setTimeFrame] = useState("1W");

    const filterData = () => {
        const days = timeFrame === "1D" ? 1 : timeFrame === "1W" ? 7 : 30;
        return selectedMarket.historicalData.slice(-days);
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-lg font-bold">Market Trends</h2>

            <select
                value={selectedMarket.id}
                onChange={(e) => {
                    const market = trends.find((m) => m.id === e.target.value);
                    if (market) setSelectedMarket(market);
                }}
                className="bg-gray-800 text-white p-2 rounded-lg w-full"
            >
                {trends.map((market) => (
                    <option key={market.id} value={market.id}>
                        {market.question}
                    </option>
                ))}
            </select>

            <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
                <div>
                    <p className="text-sm text-gray-400">Current Chance</p>
                    <p className="text-xl font-bold">{selectedMarket.currentChance}%</p>
                </div>
                <p className={`text-lg font-semibold ${selectedMarket.chanceChange.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                    {selectedMarket.chanceChange}
                </p>
            </div>

            <div className="w-full h-64 bg-gray-800 p-4 rounded-lg">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filterData()}>
                        <XAxis dataKey="date" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Line type="monotone" dataKey="chance" stroke="#22c55e" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center space-x-3">
                {["1D", "1W", "1M"].map((frame) => (
                    <button
                        key={frame}
                        onClick={() => setTimeFrame(frame)}
                        className={`px-3 py-2 rounded-lg ${timeFrame === frame ? "bg-blue-500" : "bg-gray-700"}`}
                    >
                        {frame}
                    </button>
                ))}
            </div>
        </div>
    );
}
