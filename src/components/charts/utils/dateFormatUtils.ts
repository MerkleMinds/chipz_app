"use client";

import { format, parseISO } from 'date-fns';
import { TimeRangeOption } from '../ChartConfig';

/**
 * Formats a date string based on the selected time range
 * @param dateStr ISO date string to format
 * @param timeRange Selected time range (1D, 1W, 1M, 1Y)
 * @returns Formatted date string
 */
export function formatDateByTimeRange(dateStr: string, timeRange: TimeRangeOption): string {
  try {
    if (!dateStr) return '';
    
    // Parse the date using parseISO for consistent behavior
    const date = parseISO(dateStr);
    
    // Select format pattern based on time range
    let formatPattern: string;
    switch (timeRange) {
      case '1D': 
        formatPattern = 'HH:mm';
        break;
      case '1W': 
        formatPattern = 'dd/MM';
        break;
      case '1M': 
        formatPattern = 'dd MMM';
        break;
      case '1Y': 
        formatPattern = 'MMM yy';
        break;
      default: 
        formatPattern = 'dd/MM';
    }
    
    return format(date, formatPattern);
  } catch (error) {
    console.error('Error formatting date:', dateStr, error);
    return dateStr;
  }
}

/**
 * Gets the optimal number of ticks to display based on time range
 * @param timeRange Selected time range (1D, 1W, 1M, 1Y)
 * @returns Number of ticks to display
 */
export function getTickCountByTimeRange(timeRange: TimeRangeOption): number {
  switch (timeRange) {
    case '1D': return 4;
    case '1W': return 5;
    case '1M': return 6;
    case '1Y': return 6;
    default: return 5;
  }
}

/**
 * Calculates the appropriate interval for X-axis ticks
 * @param dataLength Number of data points
 * @param tickCount Number of ticks to display
 * @returns Interval value for recharts XAxis
 */
export function calculateTickInterval(dataLength: number, tickCount: number): number | 'preserveStartEnd' {
  return dataLength <= tickCount ? 0 : 'preserveStartEnd';
}
