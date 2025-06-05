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
  forceZeroBaseline?: boolean;
  yAxisPadding?: number;
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
  forceZeroBaseline = false,
  yAxisPadding = 5,
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

    // Find min and max probability in the data
    const probabilities = data.map(d => d.probability || 0);
    const maxProb = Math.max(...probabilities);
    const minProb = forceZeroBaseline ? 0 : Math.min(...probabilities);
    
    // Calculate the range between min and max probability
    // (We're always rounding to nice values now regardless of range)
    
    // Calculate min domain with padding
    let minDomain;
    if (forceZeroBaseline) {
      minDomain = 0;
    } else {
      // For better visualization, round down to nearest 5 or 10
      // This creates a more focused view that shows data variations
      const roundDownFactor = minProb >= 10 ? 10 : 5;
      minDomain = Math.floor(minProb / roundDownFactor) * roundDownFactor;
      
      // Apply additional padding if needed
      minDomain = Math.max(0, minDomain - yAxisPadding);
      
      // If the data range is very small, expand the minimum further to show variations
      const range = maxProb - minProb;
      if (range < 10 && minDomain > 0) {
        // Expand view to show more context around the data points
        minDomain = Math.max(0, minDomain - 15);
      }
    }
    
    // Always round the max domain to a nice round number (nearest 10)
    // Calculate max domain with padding first (but don't exceed 100)
    let maxProb_withPadding = Math.min(100, maxProb + yAxisPadding);
    
    // Round up to the nearest multiple of 10
    let maxDomain = Math.min(Math.ceil(maxProb_withPadding / 10) * 10, 100);
    
    // For very small values (less than 10), consider using 5-based rounding instead
    if (maxProb_withPadding < 10) {
      maxDomain = Math.min(Math.ceil(maxProb_withPadding / 5) * 5, 100);
    }
    
    // Calculate optimal tick interval based on the domain range
    const domainRange = maxDomain - minDomain;
    let tickCount = 5; // Target number of ticks
    
    // Calculate a nice tick interval
    const rawInterval = domainRange / (tickCount - 1);
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawInterval)));
    const possibleIntervals = [1, 2, 2.5, 5, 10].map(x => x * magnitude);
    const tickInterval = possibleIntervals.find(i => i >= rawInterval) || possibleIntervals[possibleIntervals.length - 1];
    
    // Generate ticks at the calculated interval
    const ticks = [];
    const firstTick = Math.floor(minDomain / tickInterval) * tickInterval;
    for (let i = firstTick; i <= maxDomain + (tickInterval / 2); i += tickInterval) {
      // Round to avoid floating point issues
      const roundedTick = Math.round(i * 100) / 100;
      if (roundedTick >= minDomain && roundedTick <= maxDomain) {
        ticks.push(roundedTick);
      }
    }
    
    // Always include the min and max domain values in ticks if they're not already there
    if (!ticks.includes(minDomain) && minDomain > 0) ticks.unshift(minDomain);
    if (!ticks.includes(maxDomain)) ticks.push(maxDomain);
    
    // Always include 0 if we're showing from zero
    if (minDomain === 0 && !ticks.includes(0)) ticks.unshift(0);
    
    // Debug info
    console.debug(`Chart Y-axis: min=${minDomain}, max=${maxDomain}, interval=${tickInterval}, ticks=[${ticks.join(', ')}]`);
    
    return {
      domain: [minDomain, maxDomain],
      ticks: ticks.sort((a, b) => a - b)
    };
  }, [data, forceZeroBaseline, yAxisPadding]);
  
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
