"use client";

import { TooltipProps } from "recharts";
import { TIME_RANGES, TimeRangeOption, CHART_SIZES } from "../charts/ChartConfig";
import ProbabilityLineChart from "../charts/ProbabilityLineChart";
import TimeRangeSelector from "../charts/TimeRangeSelector";
import { useTimeRangeData } from "../charts/hooks/useTimeRangeData";

export type MarketTrendData = {
  id: string;
  probabilityChange: string;
  history: { date: string; probability: number }[];
};

export type MarketTrendEventPageProps = {
  market: MarketTrendData;
};

const CustomTooltip = ({ active, payload, coordinate }: TooltipProps<any, any>) => {
  if (active && payload && payload.length && coordinate) {
    const x = coordinate.x;
    const y = coordinate.y ? coordinate.y - 10 : 0;

    return (
      <text x={x} y={y} dy={-4} fill="#ccc" fontSize={12} textAnchor="middle">
        {`${payload[0].value}%`}
      </text>
    );
  }

  return null;
};

export default function MarketTrendEventPage({ market }: MarketTrendEventPageProps) {
  const { timeRange, setTimeRange, filteredData, isLoading, error } = useTimeRangeData(
    market.history,
    "1W"
  );

  const isPositive = market.probabilityChange.startsWith("+");

  return (
    <div className="text-white p-3 space-y-2 rounded-xl bg-gray-800 min-h-[250px]">
      <ProbabilityLineChart 
        data={filteredData} 
        isPositive={isPositive}
        showTooltip={true}
        customTooltip={CustomTooltip}
        minHeight={CHART_SIZES.minHeight}
        timeRange={timeRange}
        loading={isLoading}
        error={error}
      />

      <TimeRangeSelector
        timeRange={timeRange as TimeRangeOption}
        setTimeRange={setTimeRange}
        availableRanges={TIME_RANGES.default}
      />
    </div>
  );
}
