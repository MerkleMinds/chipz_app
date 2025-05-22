import { format, parseISO, isValid } from 'date-fns';
import { TimeRangeOption } from '../ChartConfig';

/**
 * Interface for chart data points
 */
export interface ChartDataPoint {
  date: string;
  probability: number;
  [key: string]: any;
}

/**
 * Format a date string based on the provided time range
 * @param dateString - ISO date string to format
 * @param timeRange - Current time range selection
 * @returns Formatted date string
 */
export function formatDateByTimeRange(dateString: string, timeRange: TimeRangeOption): string {
  try {
    if (!dateString) {
      console.warn('Empty date string provided');
      return '';
    }

    const date = parseISO(dateString);
    
    if (!isValid(date)) {
      console.warn(`Invalid date string: ${dateString}`);
      return dateString;
    }
    
    const formatPattern = getFormatPatternForTimeRange(timeRange);
    return format(date, formatPattern);
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return dateString;
  }
}

/**
 * Get the appropriate date format pattern for a time range
 * @param timeRange - Current time range selection
 * @returns Format pattern string for date-fns
 */
export function getFormatPatternForTimeRange(timeRange: TimeRangeOption): string {
  switch (timeRange) {
    case '1D':
      return 'HH:mm';
    case '1W':
    case '1M':
      return 'dd/MM';
    case '1Y':
      return 'MMM yy';
    default:
      return 'dd/MM';
  }
}

/**
 * Get the optimal number of ticks to display based on time range
 * @param timeRange - Current time range selection
 * @returns Number of ticks to display
 */
export function getOptimalTickCount(timeRange: TimeRangeOption): number {
  switch (timeRange) {
    case '1D':
      return 4;
    case '1W':
      return 5;
    case '1M':
    case '1Y':
      return 6;
    default:
      return 5;
  }
}

/**
 * Debug function to log a data point array
 * @param data - Array of data points
 * @param label - Optional label for the log
 */
export function debugDataPoints(data: ChartDataPoint[], label = 'Data points'): void {
  if (!data || data.length === 0) {
    console.log(`${label}: No data`);
    return;
  }

  console.log(`${label}: ${data.length} points`);
  console.log('First point:', data[0]);
  console.log('Last point:', data[data.length - 1]);
  
  // Check for valid date strings
  const invalidDates = data.filter(point => !isValid(parseISO(point.date)));
  if (invalidDates.length > 0) {
    console.warn(`Found ${invalidDates.length} invalid dates:`, invalidDates);
  }
}
