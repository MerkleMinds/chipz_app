"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type BalanceHistoryPoint = {
  date: string;
  balance: number;
};

export type HistoryPnlGraphProps = {
  totalBalance: number;
  balanceHistory: BalanceHistoryPoint[];
};

const CustomTooltip = ({ active, payload, coordinate }: any) => {
  if (active && payload && payload.length) {
    const x = coordinate?.x;
    const y = coordinate?.y - 10; // Position above the point

    return (
      <text x={x} y={y} dy={-4} fill="#ccc" fontSize={12} textAnchor="middle">
        {`${payload[0].value} $`}
      </text>
    );
  }

  return null;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${displayHours}:${minutes} ${ampm}`;
};

const HistoryPnlGraph = ({ totalBalance, balanceHistory = [] }: HistoryPnlGraphProps) => {
  const [timeRange, setTimeRange] = useState("1W");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getFilteredHistory = () => {
    if (!balanceHistory || !Array.isArray(balanceHistory) || balanceHistory.length === 0) {
      return [];
    }

    // First sort all data by date
    const sortedData = [...balanceHistory].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const now = new Date();

    if (timeRange === "1D") {
      const oneDayAgo = new Date(now);
      oneDayAgo.setHours(now.getHours() - 24);

      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneDayAgo
      );

      // If we have less than 2 points for the day, show at least 2 points
      return filteredPoints.length < 2 ? sortedData.slice(-2) : filteredPoints;
    }

    if (timeRange === "1W") {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);

      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneWeekAgo
      );

      return filteredPoints.length < 2 ? sortedData.slice(-7) : filteredPoints;
    }

    if (timeRange === "1M") {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setDate(now.getDate() - 30);

      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneMonthAgo
      );

      return filteredPoints.length < 2 ? sortedData : filteredPoints;
    }

    // 1Y view
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const filteredPoints = sortedData.filter(
      (point) => new Date(point.date) >= oneYearAgo
    );

    return filteredPoints.length < 2 ? sortedData : filteredPoints;
  };

  // Get the filtered data
  const chartData = getFilteredHistory();
  
  // Get key dates for display below the chart
  const getKeyDates = () => {
    if (chartData.length === 0) return [];
    
    const dates = [...chartData];
    const totalPoints = dates.length;
    
    if (totalPoints <= 4) {
      return dates.map(point => point.date);
    }
    
    // Return first, ~33%, ~66%, and last date
    return [
      dates[0].date,
      dates[Math.floor(totalPoints * 0.33)].date,
      dates[Math.floor(totalPoints * 0.66)].date,
      dates[totalPoints - 1].date
    ];
  };
  
  const keyDates = getKeyDates();

  const handlePointClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length) {
      setSelectedDate(data.activePayload[0].payload.date);
    }
  };

  return (
    <>
      <div className="flex flex-1 justify-between flex-row mb-2 items-center">
        <h3 className="text-lg">PnL Graph</h3>
        <div className="flex flex-row gap-2 items-center">
          <h3
            className={`text-lg ${
              totalBalance >= 0 ? "text-[#23C45E]" : "text-[#EF4444]"
            }`}
          >
            {totalBalance} $
          </h3>
        </div>
      </div>
      
      {/* Date display with fixed height placeholder */}
      <div className="h-6 text-sm text-gray-400 mb-2 text-center">
        {selectedDate ? formatFullDate(selectedDate) : "\u00A0"} {/* Non-breaking space as placeholder */}
      </div>
      
      <div className="w-full h-40 bg-gray-800 rounded-md mb-2 border border-neutral-700 p-2">
        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ left: 0, right: 0, top: 5, bottom: 10 }}
              onClick={handlePointClick}
            >
              <YAxis
                stroke="transparent"
                tick={{ fontSize: 9, fill: "#ccc" }}
                orientation="right"
                width={30}
                tickFormatter={(value) => `${value} $`}
              />
              <CartesianGrid
                horizontal={true}
                vertical={false}
                stroke="#444"
                fill="#1f2937"
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke={totalBalance >= 0 ? "#23C45E" : "#EF4444"}
                strokeWidth={2}
                dot={(props) => {
                  const isLastPoint =
                    props.index === chartData.length - 1;
                  return isLastPoint ? (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={4}
                      fill={totalBalance >= 0 ? "#23C45E" : "#EF4444"}
                    />
                  ) : (
                    <circle r={0} cx={props.cx} cy={props.cy} />
                  );
                }}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No balance history available
          </div>
        )}
      </div>
      
      {/* Date markers below the chart */}
      {keyDates.length > 0 && (
        <div className="flex justify-between mb-2 text-xs text-gray-400">
          {keyDates.map((date, index) => (
            <div key={index}>{formatDate(date)}</div>
          ))}
        </div>
      )}
      
      <div className="flex mb-2 gap-2">
        {["1D", "1W", "1M", "1Y"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`text-xs rounded-xl border-xl px-2 py-1 ${
              timeRange === range
                ? "bg-white text-gray-800"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </>
  );
};

export default HistoryPnlGraph;