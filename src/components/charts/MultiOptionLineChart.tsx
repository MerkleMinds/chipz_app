"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  Legend,
} from "recharts";
import { formatDateByTimeRange, getTickCountByTimeRange, calculateTickInterval } from "./utils/dateFormatUtils";
import { 
  CHART_COLORS, 
  CHART_MARGINS, 
  CHART_SIZES, 
  formatPercentage,
  TimeRangeOption 
} from "./ChartConfig";

export interface MultiOptionDataPoint {
  date: string;
  [key: string]: any;
}

interface MultiOptionLineChartProps {
  data: MultiOptionDataPoint[];
  options: {
    id: string;
    title: string;
    color: string;
  }[];
  showTooltip?: boolean;
  customTooltip?: React.FC<TooltipProps<any, any>>;
  className?: string;
  height?: string;
  minHeight?: string;
  timeRange?: TimeRangeOption;
}

// Generate a color based on index
const getLineColor = (index: number): string => {
  const colors = [
    "#23C45E", // Green
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#F59E0B", // Amber
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#10B981", // Emerald
    "#6366F1", // Indigo
  ];
  
  return colors[index % colors.length];
};

const MultiOptionLineChart: React.FC<MultiOptionLineChartProps> = ({
  data,
  options,
  showTooltip = false,
  customTooltip,
  className = "",
  height = CHART_SIZES.height,
  minHeight,
  timeRange = "1W",
}) => {
  const containerClass = `w-full ${height} flex items-center justify-center m-0 ${minHeight ? minHeight : ""}`;

  // Calculate Y-axis domain and ticks based on data
  const yAxisConfig = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        domain: [0, 100],
        ticks: [0, 20, 40, 60, 80, 100]
      };
    }

    // Find max value across all options
    let maxValue = 0;
    data.forEach(dataPoint => {
      options.forEach(option => {
        const value = dataPoint[option.id] || 0;
        if (value > maxValue) maxValue = value;
      });
    });
    
    // Round up to nearest multiple of 20 for max domain value
    const maxDomain = Math.min(Math.ceil(maxValue / 20) * 20, 100);
    
    // Generate ticks at equal intervals
    const tickInterval = maxDomain <= 60 ? 15 : 20;
    const ticks = [];
    for (let i = 0; i <= maxDomain; i += tickInterval) {
      ticks.push(i);
    }
    
    // Always include 0 and maxDomain in ticks
    if (!ticks.includes(0)) ticks.unshift(0);
    if (!ticks.includes(maxDomain)) ticks.push(maxDomain);
    
    return {
      domain: [0, maxDomain],
      ticks: ticks.sort((a, b) => a - b)
    };
  }, [data, options]);

  // Use shared utility for formatting dates
  const formatXAxis = (dateStr: string) => {
    // Log for debugging
    console.log(`MultiOptionLineChart formatting date: ${dateStr}, timeRange: ${timeRange}`);
    return formatDateByTimeRange(dateStr, timeRange);
  };
  
  // Use shared utility for tick count
  const getTickCount = () => getTickCountByTimeRange(timeRange);

  const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
          <p className="text-gray-300 text-xs">{new Date(label).toLocaleDateString()}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-entry-${entry.name}-${index}`} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${containerClass} ${className}`}>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={CHART_MARGINS.default}
          >
            <XAxis
              dataKey="date"
              stroke="transparent"
              tick={{ fontSize: CHART_SIZES.tickFontSize, fill: CHART_COLORS.tickColor }}
              tickLine={false}
              axisLine={false}
              minTickGap={5}
              height={30}
              tickCount={getTickCount()}
              interval={calculateTickInterval(data.length, getTickCount())}
              tickFormatter={formatXAxis}
            />
            <YAxis
              stroke="transparent"
              tick={{ fontSize: CHART_SIZES.tickFontSize, fill: CHART_COLORS.tickColor }}
              orientation="right"
              width={CHART_SIZES.yAxisWidth}
              tickFormatter={formatPercentage}
              domain={yAxisConfig.domain}
              allowDecimals={false}
              ticks={yAxisConfig.ticks}
            />
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke={CHART_COLORS.gridStroke}
              fill={CHART_COLORS.gridFill}
              horizontalCoordinatesGenerator={(props) => {
                // Force grid lines at specific percentage points based on calculated ticks
                return yAxisConfig.ticks.map(value => {
                  return props.yAxis.scale(value);
                });
              }}
            />
            {showTooltip && (
              <Tooltip content={customTooltip || CustomTooltip} cursor={false} />
            )}
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', color: '#ccc' }}
            />
            {options.map((option, index) => (
              <Line
                key={option.id}
                type="monotone"
                dataKey={option.id}
                name={option.title}
                stroke={option.color || getLineColor(index)}
                strokeWidth={CHART_SIZES.strokeWidth}
                dot={false}
                activeDot={{ r: CHART_SIZES.dotRadius }}
                isAnimationActive={false}
                connectNulls={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          No data available
        </div>
      )}
    </div>
  );
};

export default MultiOptionLineChart;
