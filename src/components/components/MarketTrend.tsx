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

    const formatXAxis = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getMonth() + 1}-${date.getDate()}`;
    };

    if (!selectedMarket) return null;

    return (
        <div className="text-white p-3 space-y-2 border border-neutral-700 rounded-xl bg-gray-800">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
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
            <div className="w-full h-40 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                        data={getFilteredHistory(selectedMarket)}
                        margin={{ left: -20, right: 20, top: 5, bottom: -5 }}
                    >
                        <XAxis dataKey="date" stroke="#ccc" tick={{ fontSize: 9 }} tickFormatter={formatXAxis} />
                        <YAxis stroke="#ccc" tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="probability" stroke={selectedMarket.probabilityChange.startsWith("+") ? "#6BD932" : "#FE4E4F"} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center space-x-1">
                {["1D", "1W", "1M"].map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 text-xs rounded border border-neutral-700 ${timeRange === range ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400"}`}
                    >
                        {range}
                    </button>
                ))}
            </div>
        </div>
    );
}
