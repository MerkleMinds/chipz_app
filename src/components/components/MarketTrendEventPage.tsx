"use client";

import { TIME_RANGES, TimeRangeOption, CHART_SIZES } from "../charts/ChartConfig";
import ProbabilityLineChart from "../charts/ProbabilityLineChart";
import TimeRangeSelector from "../charts/TimeRangeSelector";
import { useTimeRangeData } from "../charts/hooks/useTimeRangeData";
import { useMemo } from "react";

export type MarketTrendData = {
  id: string;
  probabilityChange: string;
  history: { date: string; probability: number }[];
};

export type MarketTrendEventPageProps = {
  market: MarketTrendData;
};

export default function MarketTrendEventPage({ market }: MarketTrendEventPageProps) {
  const memoizedMarket = useMemo(() => market, [market]);
  
  const { timeRange, setTimeRange: updateTimeRange, filteredData, isLoading, error } = useTimeRangeData(
    memoizedMarket.history,
    "1W"
  );

  // Handle time range change
  const handleTimeRangeChange = (newRange: TimeRangeOption) => {
    updateTimeRange(newRange);
  };

  const isPositive = market.probabilityChange.startsWith("+");

  return (
    <div className="text-white p-3 space-y-2 rounded-xl bg-bb-bg-card min-h-[250px]">
      <ProbabilityLineChart 
        data={filteredData} 
        isPositive={isPositive}
        minHeight={CHART_SIZES.minHeight}
        timeRange={timeRange}
        loading={isLoading}
        error={error}
      />

      <TimeRangeSelector
        timeRange={timeRange as TimeRangeOption}
        setTimeRange={handleTimeRangeChange}
        availableRanges={TIME_RANGES.default}
      />
    </div>
  );
}
