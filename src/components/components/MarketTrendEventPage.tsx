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
  probabilityChange: string;
  history: { date: string; probability: number }[];
};

export type MarketTrendEventPageProps = {
  market: MarketTrendData;
};

export default function MarketTrendEventPage({ market }: MarketTrendEventPageProps) {
  const [timeRange, setTimeRange] = useState("1W");

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

  return (
    <div className="text-white p-3 space-y-2 border border-neutral-700 rounded-xl bg-gray-800">
      <div className="w-full h-40 flex items-center justify-center m-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getFilteredHistory(market)}
            margin={{ left: 0, right: 0, top: 5, bottom: 10 }}
          >
            <YAxis
              stroke="transparent"
              tick={{ fontSize: 9, fill: "#ccc" }}
              orientation="right"
              width={30}
              tickFormatter={(value) => `${value}%`}
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
                market.probabilityChange.startsWith("+")
                  ? "#6BD932"
                  : "#FE4E4F"
              }
              strokeWidth={2}
              dot={(props) => {
                const isLastPoint =
                  props.index === getFilteredHistory(market).length - 1;
                return isLastPoint ? (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill={
                      market.probabilityChange.startsWith("+")
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
            className={`text-xs rounded-xl border-xl w-[27px] h-[17px] ${
              timeRange === range
                ? "bg-white text-bb-black"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
}
