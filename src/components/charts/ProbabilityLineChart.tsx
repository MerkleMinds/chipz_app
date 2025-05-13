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
} from "recharts";
import { 
  CHART_COLORS, 
  CHART_MARGINS, 
  CHART_SIZES, 
  formatPercentage 
} from "./ChartConfig";

export interface DataPoint {
  date: string;
  probability: number;
  [key: string]: any;
}

interface ProbabilityLineChartProps {
  data: DataPoint[];
  isPositive?: boolean;
  showTooltip?: boolean;
  customTooltip?: React.FC<TooltipProps<any, any>>;
  className?: string;
  height?: string;
  minHeight?: string;
}

const ProbabilityLineChart: React.FC<ProbabilityLineChartProps> = ({
  data,
  isPositive = true,
  showTooltip = false,
  customTooltip,
  className = "",
  height = CHART_SIZES.height,
  minHeight,
}) => {
  const containerClass = `w-full ${height} flex items-center justify-center m-0 ${minHeight ? minHeight : ""}`;
  const lineColor = isPositive ? CHART_COLORS.positive : CHART_COLORS.negative;
  const dotFillColor = isPositive ? CHART_COLORS.positive : CHART_COLORS.negative;

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
            {showTooltip && customTooltip && (
              <Tooltip content={customTooltip} cursor={false} />
            )}
            <Line
              type="monotone"
              dataKey="probability"
              stroke={lineColor}
              strokeWidth={CHART_SIZES.strokeWidth}
              dot={(props) => {
                const isLastPoint = props.index === data.length - 1;
                return isLastPoint ? (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={CHART_SIZES.dotRadius}
                    fill={dotFillColor}
                  />
                ) : (
                  <circle r={0} cx={props.cx} cy={props.cy} />
                );
              }}
              activeDot={{ r: CHART_SIZES.dotRadius }}
            />
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

export default ProbabilityLineChart;
