"use client";

import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
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
  timeRange?: "1D" | "1W" | "1M" | "1Y";
}

const BalanceLineChart: React.FC<BalanceLineChartProps> = ({
  data,
  totalBalance,
  className = "",
  height = CHART_SIZES.height,
  timeRange = "1W",
}) => {
  const containerClass = `w-full ${height} flex items-center justify-center m-0`;
  const isPositive = totalBalance >= 0;
  const lineColor = isPositive ? CHART_COLORS.positive : CHART_COLORS.negative;
  const dotFillColor = isPositive ? CHART_COLORS.positive : CHART_COLORS.negative;
  
  // Calculate Y-axis domain and ticks based on data
  const yAxisConfig = React.useMemo(() => {
    if (!data || data.length === 0) {
      return {
        domain: [0, 1000],
        ticks: [0, 200, 400, 600, 800, 1000]
      };
    }

    // Find min and max balance in the data
    const minBalance = Math.min(...data.map(d => d.balance || 0));
    const maxBalance = Math.max(...data.map(d => d.balance || 0));
    
    // Round values for better tick display
    const minDomain = Math.max(0, Math.floor(minBalance / 100) * 100);
    const maxDomain = Math.ceil(maxBalance / 100) * 100;
    
    // Generate exactly 5 ticks for cleaner display
    const tickCount = 5;
    const tickInterval = Math.ceil((maxDomain - minDomain) / (tickCount - 1) / 100) * 100;
    
    // Create array with exact number of ticks
    const ticks = [];
    for (let i = 0; i < tickCount; i++) {
      const value = minDomain + (i * tickInterval);
      if (value <= maxDomain) {
        ticks.push(value);
      }
    }
    
    // Always include min and max domain in ticks
    if (!ticks.includes(minDomain)) ticks.unshift(minDomain);
    if (!ticks.includes(maxDomain)) ticks.push(maxDomain);
    
    return {
      domain: [minDomain, maxDomain],
      ticks: ticks.sort((a, b) => a - b)
    };
  }, [data]);
  
  // Format date based on time range
  const formatXAxis = (dateStr: string) => {
    try {
      if (!dateStr) return '';
      
      const date = parseISO(dateStr);
      let formatPattern = 'dd/MM';
      
      switch (timeRange) {
        case '1D': formatPattern = 'HH:mm'; break;
        case '1W': formatPattern = 'dd/MM'; break;
        case '1M': formatPattern = 'dd MMM'; break; // Show day and abbreviated month name
        case '1Y': formatPattern = 'MMM yy'; break;
      }
      
      return format(date, formatPattern);
    } catch (error) {
      console.error('Error formatting date:', dateStr, error);
      return dateStr;
    }
  };
  
  // Calculate optimal tick count based on time range
  const getTickCount = () => {
    switch (timeRange) {
      case '1D': return 4;
      case '1W': return 5;
      case '1M': return 6;
      case '1Y': return 6;
      default: return 5;
    }
  };

  return (
    <div className={`${containerClass} ${className}`}>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={CHART_MARGINS.withPadding}
          >
            <XAxis 
              dataKey="date"
              tick={{ fontSize: CHART_SIZES.tickFontSize, fill: CHART_COLORS.tickColor }}
              tickFormatter={formatXAxis}
              tickCount={getTickCount()}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              stroke="transparent"
              tick={{ fontSize: CHART_SIZES.tickFontSize, fill: CHART_COLORS.tickColor, dx: -2 }}
              orientation="right"
              width={CHART_SIZES.yAxisWidth}
              tickFormatter={formatCurrency}
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
                // Force grid lines at specific balance points based on calculated ticks
                return yAxisConfig.ticks.map(value => {
                  return props.yAxis.scale(value);
                });
              }}
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
