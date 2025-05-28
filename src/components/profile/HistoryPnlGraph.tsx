"use client";

import React from "react";
import { TIME_RANGES, TimeRangeOption } from "../charts/ChartConfig";
import BalanceLineChart from "../charts/BalanceLineChart";
import TimeRangeSelector from "../charts/TimeRangeSelector";
import { useTimeRangeData } from "../charts/hooks/useTimeRangeData";

export type BalanceHistoryPoint = {
  date: string;
  balance: number;
};

export type HistoryPnlGraphProps = {
  totalBalance: number;
  balanceHistory: BalanceHistoryPoint[];
};

const HistoryPnlGraph = ({
  totalBalance,
  balanceHistory = [],
}: HistoryPnlGraphProps) => {
  // Use type assertion to make TypeScript happy since BalanceHistoryPoint has balance instead of probability
  const { timeRange, setTimeRange, filteredData } = useTimeRangeData(
    balanceHistory as any,
    "1W"
  );

  return (
    <div className="flex-grow text-white p-3 space-y-2 rounded-xl bg-bb-bg-card">
      <BalanceLineChart 
        data={filteredData as any} 
        totalBalance={totalBalance}
      />

      <TimeRangeSelector
        timeRange={timeRange as TimeRangeOption}
        setTimeRange={setTimeRange}
        availableRanges={TIME_RANGES.withYear}
      />
    </div>
  );
};

export default HistoryPnlGraph;
