"use client";

import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { 
  CHART_COLORS, 
  CHART_MARGINS, 
  CHART_SIZES, 
  formatCurrency 
} from "./ChartConfig";

export interface BalanceDataPoint {
  date: string;
  balance: number;
  [key: string]: any;
}

interface BalanceLineChartProps {
  data: BalanceDataPoint[];
  totalBalance: number;
  className?: string;
  height?: string;
}

const BalanceLineChart: React.FC<BalanceLineChartProps> = ({
  data,
  totalBalance,
  className = "",
  height = CHART_SIZES.height,
}) => {
  const containerClass = `w-full ${height} flex items-center justify-center m-0`;
  const isPositive = totalBalance >= 0;
  const lineColor = isPositive ? CHART_COLORS.positive : CHART_COLORS.negative;
  const dotFillColor = isPositive ? CHART_COLORS.positive : CHART_COLORS.negative;

  return (
    <div className={`${containerClass} ${className}`}>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={CHART_MARGINS.withPadding}
          >
            <YAxis
              stroke="transparent"
              tick={{ fontSize: CHART_SIZES.tickFontSize, fill: CHART_COLORS.tickColor, dx: -2 }}
              orientation="right"
              width={CHART_SIZES.yAxisWidth}
              tickFormatter={formatCurrency}
            />
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke={CHART_COLORS.gridStroke}
              fill={CHART_COLORS.gridFill}
            />
            <Line
              type="monotone"
              dataKey="balance"
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
          No balance history available
        </div>
      )}
    </div>
  );
};

export default BalanceLineChart;
