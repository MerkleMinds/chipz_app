"use client";

import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
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
  className = "",
  height = CHART_SIZES.height,
  minHeight,
}) => {
  const containerClass = `w-full ${height} flex items-center justify-center m-0 ${minHeight ? minHeight : ""}`;

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
