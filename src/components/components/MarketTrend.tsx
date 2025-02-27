"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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

    const now = new Date();

    if (timeRange === "1D") {
      const oneDayAgo = new Date();
      oneDayAgo.setHours(now.getHours() - 24);

      const filteredPoints = market.history
        .filter((point) => new Date(point.date) >= oneDayAgo)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      return filteredPoints.length < 2
        ? market.history.slice(-2)
        : filteredPoints;
    }

    const daysToShow = timeRange === "1W" ? 7 : 30;
    return market.history.slice(-daysToShow);
  };

  if (!selectedMarket) return null;

  return (
    <div className="text-white p-3 space-y-2 border border-neutral-700 rounded-xl bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex flex-col ">
          <div className="flex items-center space-x-2">
            <img
              src={selectedMarket.image || ""}
              alt="flag"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex justify-between grow">
              <div className="flex w-full mr-auto items-center">
                <p className="text-white font-bold text-xs">
                  {selectedMarket.title}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-white text-lg font-bold">
              {selectedMarket.probability}% chance
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-40 flex items-center justify-center m-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getFilteredHistory(selectedMarket)}
            margin={{ left: 0, right: 0, top: 5, bottom: 10 }}
          >
            <YAxis
              stroke="transparent"
              tick={{ fontSize: 9, fill: "#ccc" }}
              orientation="right"
              width={30}
            />
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#444"
              fill="#1f2937"
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="probability"
              stroke={
                selectedMarket.probabilityChange.startsWith("+")
                  ? "#6BD932"
                  : "#FE4E4F"
              }
              strokeWidth={2}
              dot={(props) => {
                const isLastPoint =
                  props.index === getFilteredHistory(selectedMarket).length - 1;
                return isLastPoint ? (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill={
                      selectedMarket.probabilityChange.startsWith("+")
                        ? "#6BD932"
                        : "#FE4E4F"
                    }
                  />
                ) : (
                  <circle r={0} cx={props.cx} cy={props.cy} />
                );
              }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex mb-2">
        {["1D", "1W", "1M"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 text-xs rounded-xl border-xl ${
              timeRange === range
                ? "bg-white text-black"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="flex w-11/12 mx-auto">
        <div className="flex justify-between gap-2 my-3 w-full">
          <button className="bg-green-500 text-white py-1 px-4 rounded-lg text-xs border border-green-600 w-[142px] h-[28px]">
            Buy Yes {selectedMarket.probability}$
          </button>
          <button className="bg-red-500 text-white py-1 px-4 rounded-lg text-xs border border-red-600 w-[142px] h-[28px]">
            Buy No {selectedMarket.probability}$
          </button>
        </div>
      </div>
    </div>
  );
}
