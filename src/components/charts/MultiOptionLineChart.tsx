"use client";

import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  Legend,
} from "recharts";
import { 
  CHART_COLORS, 
  CHART_MARGINS, 
  CHART_SIZES, 
  formatPercentage 
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
}) => {
  const containerClass = `w-full ${height} flex items-center justify-center m-0 ${minHeight ? minHeight : ""}`;

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
            <YAxis
              stroke="transparent"
              tick={{ fontSize: CHART_SIZES.tickFontSize, fill: CHART_COLORS.tickColor }}
              orientation="right"
              width={CHART_SIZES.yAxisWidth}
              tickFormatter={formatPercentage}
            />
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke={CHART_COLORS.gridStroke}
              fill={CHART_COLORS.gridFill}
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
