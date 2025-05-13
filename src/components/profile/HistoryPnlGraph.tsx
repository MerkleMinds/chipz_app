"use client";

import React from "react";
import { TIME_RANGES, TimeRangeOption } from "../charts/ChartConfig";
import BalanceLineChart from "../charts/BalanceLineChart";
import TimeRangeSelector from "../charts/TimeRangeSelector";
import useTimeRangeFilter from "../charts/useTimeRangeFilter";

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
  const { timeRange, setTimeRange, filteredData } = useTimeRangeFilter<BalanceHistoryPoint>(
    balanceHistory,
    "1W"
  );

  return (
    <div className="flex-grow text-white p-3 space-y-2 rounded-xl bg-gray-800">
      <BalanceLineChart 
        data={filteredData} 
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
