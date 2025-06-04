"use client";

import React, { useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { formatDateByTimeRange, getTickCountByTimeRange, calculateTickInterval } from "./utils/dateFormatUtils";
import { 
  CHART_COLORS, 
  CHART_MARGINS, 
  CHART_SIZES, 
  formatPercentage,
  TimeRangeOption 
} from "./ChartConfig";
import { ChartDataPoint, debugDataPoints } from "./utils/chartUtils";

/**
 * ProbabilityLineChart props interface
 */
interface ProbabilityLineChartProps {
  data: ChartDataPoint[];
  isPositive?: boolean;
  showTooltip?: boolean;
  customTooltip?: React.FC<TooltipProps<any, any>>;
  className?: string;
  height?: string;
  minHeight?: string;
  timeRange?: TimeRangeOption;
  loading?: boolean;
  error?: Error | null;
}

/**
 * A line chart component that displays probability data over time
 * with appropriate date formatting based on the selected time range
 */
const ProbabilityLineChart: React.FC<ProbabilityLineChartProps> = ({
  data,
  isPositive = true,
  showTooltip = false,
  customTooltip,
  className = "",
  height = CHART_SIZES.height,
  minHeight,
  timeRange = "1W",
  loading = false,
  error = null,
}) => {
  // Log data for debugging
  useEffect(() => {
    debugDataPoints(data, 'ProbabilityLineChart data');
  }, [data, timeRange]);


  // Memoize styling values to prevent unnecessary re-renders
  const styles = useMemo(() => ({
    containerClass: `w-full ${height} flex items-center justify-center m-0 ${minHeight ? minHeight : ""}`,
    lineColor: isPositive ? CHART_COLORS.positive : CHART_COLORS.negative,
    dotFillColor: isPositive ? CHART_COLORS.positive : CHART_COLORS.negative,
  }), [height, isPositive, minHeight]);
  
  // Calculate Y-axis domain and ticks based on data
  const yAxisConfig = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        domain: [0, 100],
        ticks: [0, 20, 40, 60, 80, 100]
      };
    }

    // Find max probability in the data
    const maxProb = Math.max(...data.map(d => d.probability || 0));
    
    // Round up to nearest multiple of 20 for max domain value
    const maxDomain = Math.min(Math.ceil(maxProb / 20) * 20, 100);
    
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
  }, [data]);
  
  // Use shared utility for formatting dates
  const formatXAxis = (dateStr: string) => {
    // Log for debugging
    console.log(`ProbabilityLineChart formatting date: ${dateStr}, timeRange: ${timeRange}`);
    return formatDateByTimeRange(dateStr, timeRange);
  };
  
  // Use shared utility for tick count
  const getTickCount = () => getTickCountByTimeRange(timeRange);

  // Handle loading state
  if (loading) {
    return (
      <div className={`${styles.containerClass} ${className}`}>
        <div className="flex items-center justify-center h-full text-gray-400">
          Loading chart data...
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={`${styles.containerClass} ${className}`}>
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <p>Error loading chart data</p>
          <p className="text-xs mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  // Handle empty data state
  if (!data || data.length === 0) {
    return (
      <div className={`${styles.containerClass} ${className}`}>
        <div className="flex items-center justify-center h-full text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.containerClass} ${className}`}>
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
          {showTooltip && customTooltip && (
            <Tooltip content={customTooltip} cursor={false} />
          )}
          <Line
            type="monotone"
            dataKey="probability"
            stroke={styles.lineColor}
            strokeWidth={CHART_SIZES.strokeWidth}
            dot={(props) => {
              const isLastPoint = props.index === data.length - 1;
              return isLastPoint ? (
                <circle
                  key={`dot-${props.index}`}
                  cx={props.cx}
                  cy={props.cy}
                  r={CHART_SIZES.dotRadius}
                  fill={styles.dotFillColor}
                />
              ) : (
                <circle key={`dot-${props.index}`} r={0} cx={props.cx} cy={props.cy} />
              );
            }}
            activeDot={{ r: CHART_SIZES.dotRadius }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProbabilityLineChart;
