"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { HalfCircleProgress } from "../HalfCircleProgress";

export type MarketTrendData = {
    id: string;
    title: string;
    probability: number;
    probabilityChange: string;
    history: { date: string; probability: number }[];
    image: string;
};

export type MarketTrendsProps = {
    markets: MarketTrendData[];
};

export default function MarketTrend({ markets }: MarketTrendsProps) {
    const [timeRange, setTimeRange] = useState("1W");
    
    if (!Array.isArray(markets)) return null;
    
    const selectedMarket = markets.length === 1 ? markets[0] : null;

    const getFilteredHistory = (market: MarketTrendData) => {
        if (!market?.history || !Array.isArray(market.history)) return [];
        
        const daysToShow = timeRange === "1D" ? 1 : timeRange === "1W" ? 7 : 30;
        return market.history.slice(-daysToShow);
    };

    if (!selectedMarket) return null;

    return (
        <div className="text-white p-6 space-y-4 border border-neutral-700 rounded-xl bg-gray-800">
            <div>
                <div className="flex items-center space-x-3">
                    <img
                        src={selectedMarket.image || ''}
                        alt="flag"
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="flex justify-between grow">
                        <div className="flex w-full mr-auto items-center">
                            <p className="text-white font-bold text-xs">{selectedMarket.title}</p>
                        </div>
                    </div>
                    <div className="">
                        <HalfCircleProgress probability={selectedMarket.probability} />
                    </div>
                </div>
            </div>
            <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="95%" height="100%">
                    <LineChart 
                        data={getFilteredHistory(selectedMarket)}
                        margin={{ left: 0, right: 20, top: 10, bottom: 10 }}
                    >
                        <XAxis dataKey="date" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Line type="monotone" dataKey="probability" stroke={selectedMarket.probabilityChange.startsWith("+") ? "#6BD932" : "#FE4E4F"} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center space-x-3">
                {["1D", "1W", "1M"].map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-2 rounded-lg border border-neutral-700 ${timeRange === range ? "bg-blue-500" : "bg-gray-800"}`}
                    >
                        {range}
                    </button>
                ))}
            </div>
        </div>
    );
}
