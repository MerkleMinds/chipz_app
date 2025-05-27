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
import { format, parseISO } from "date-fns";
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
            interval={data.length <= getTickCount() ? 0 : 'preserveStartEnd'}
            tickFormatter={formatXAxis}
          />
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
