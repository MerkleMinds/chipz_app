"use client";

import React from "react";
import { XAxis, XAxisProps } from "recharts";
import { TimeRangeOption } from "../ChartConfig";
import { formatDateByTimeRange, getOptimalTickCount } from "../utils/chartUtils";

interface DateXAxisProps extends Omit<XAxisProps, 'tickFormatter'> {
  timeRange: TimeRangeOption;
  dataLength: number;
  tickColor?: string;
  tickFontSize?: number;
}

/**
 * A specialized XAxis component for displaying dates with appropriate formatting
 * based on the selected time range
 */
const DateXAxis: React.FC<DateXAxisProps> = ({
  timeRange,
  dataLength,
  tickColor = "#ccc",
  tickFontSize = 9,
  ...restProps
}) => {
  // Calculate optimal tick configuration based on time range and data length
  const tickCount = getOptimalTickCount(timeRange);
  
  // Determine the appropriate interval based on data length
  // Use a number for fixed interval, or 'preserveStartEnd' to show first and last points
  const interval = dataLength <= tickCount ? 0 : 'preserveStartEnd';
  
  // Log for debugging
  console.log('DateXAxis rendering with:', { timeRange, dataLength, tickCount, interval });

  return (
    <XAxis
      dataKey="date"
      stroke="transparent"
      tick={{ fontSize: tickFontSize, fill: tickColor }}
      tickLine={false}
      axisLine={false}
      minTickGap={5}
      tickCount={tickCount}
      interval={interval}
      tickFormatter={(value) => {
        const formatted = formatDateByTimeRange(value, timeRange);
        console.log('Formatting date:', value, 'to:', formatted);
        return formatted;
      }}
      height={30} // Ensure there's enough height for the axis
      {...restProps}
    />
  );
};

export default DateXAxis;
