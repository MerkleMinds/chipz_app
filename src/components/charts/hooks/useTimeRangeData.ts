"use client";

import { useState, useMemo } from "react";
import { TimeRangeOption } from "../ChartConfig";
import { ChartDataPoint } from "../utils/chartUtils";

/**
 * Interface for the return value of the useTimeRangeData hook
 */
interface TimeRangeDataResult<T extends ChartDataPoint> {
  timeRange: TimeRangeOption;
  setTimeRange: (range: TimeRangeOption) => void;
  filteredData: T[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook to filter data based on time range
 * @param data - Array of data points with date property
 * @param initialTimeRange - Initial time range to use
 * @returns Object with time range state and filtered data
 */
export function useTimeRangeData<T extends ChartDataPoint>(
  data: T[],
  initialTimeRange: TimeRangeOption = "1W"
): TimeRangeDataResult<T> {
  const [timeRange, setTimeRange] = useState<TimeRangeOption>(initialTimeRange);
  const [isLoading] = useState<boolean>(false); // We're not using setIsLoading in this version
  const [error, setError] = useState<Error | null>(null);

  const filteredData = useMemo(() => {
    try {
      // Reset error state
      setError(null);
      
      // Validate input data
      if (!data || !Array.isArray(data)) {
        console.warn('Invalid data provided to useTimeRangeData');
        return [];
      }
      
      // Handle empty data case
      if (data.length === 0) {
        console.warn('Empty data array provided to useTimeRangeData');
        return [];
      }

      // Log data for debugging
      console.log(`useTimeRangeData: Processing ${data.length} data points for ${timeRange} range`);
      console.log('First data point:', data[0]);
      console.log('Last data point:', data[data.length - 1]);

      // Ensure all data points have valid dates
      const validData = data.filter(point => {
        if (!point.date) {
          console.warn('Data point missing date property:', point);
          return false;
        }
        
        try {
          const date = new Date(point.date);
          if (isNaN(date.getTime())) {
            console.warn('Invalid date in data point:', point);
            return false;
          }
          return true;
        } catch (err) {
          console.warn('Error parsing date:', err, point);
          return false;
        }
      });

      if (validData.length === 0) {
        console.warn('No valid data points with dates found');
        return [];
      }

      // Sort data by date (ascending)
      const sortedData = [...validData].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      // Create a fixed set of data points for each time range if needed
      // This ensures we always have enough points for visualization
      const now = new Date();
      let cutoffDate: Date;
      
      // Calculate cutoff date based on time range
      switch (timeRange) {
        case "1D":
          cutoffDate = new Date(now);
          cutoffDate.setHours(now.getHours() - 24);
          break;
          
        case "1W":
          cutoffDate = new Date(now);
          cutoffDate.setDate(now.getDate() - 7);
          break;
          
        case "1M":
          cutoffDate = new Date(now);
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
          
        case "1Y":
          cutoffDate = new Date(now);
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
          
        default:
          cutoffDate = new Date(now);
          cutoffDate.setDate(now.getDate() - 7); // Default to 1W
      }

      // Filter data based on cutoff date
      const filteredPoints = sortedData.filter(point => {
        const pointDate = new Date(point.date);
        return pointDate >= cutoffDate;
      });

      console.log(`After filtering: ${filteredPoints.length} points remain for ${timeRange} range`);

      // Handle case with insufficient data points
      if (filteredPoints.length < 2) {
        console.warn(`Insufficient filtered data points (${filteredPoints.length}) for ${timeRange} range, using fallback`);
        
        // Determine max points to show based on time range
        let maxPoints: number;
        switch (timeRange) {
          case "1D": maxPoints = 24; break;  // Hourly for a day
          case "1W": maxPoints = 7; break;   // Daily for a week
          case "1M": maxPoints = 30; break;  // Daily for a month
          case "1Y": maxPoints = 12; break;  // Monthly for a year
          default: maxPoints = 7;
        }
        
        // Return limited number of points from the full dataset
        const fallbackData = sortedData.slice(-Math.min(maxPoints, sortedData.length));
        console.log(`Using ${fallbackData.length} fallback data points`);
        return fallbackData;
      }
      
      // Ensure we have a reasonable number of points for the chart
      // If we have too many points, sample them to reduce density
      const maxPointsForDisplay = 30; // Maximum number of points to display
      if (filteredPoints.length > maxPointsForDisplay) {
        const samplingRate = Math.ceil(filteredPoints.length / maxPointsForDisplay);
        const sampledPoints = filteredPoints.filter((_, index) => index % samplingRate === 0 || index === filteredPoints.length - 1);
        console.log(`Sampled ${filteredPoints.length} points down to ${sampledPoints.length} points`);
        return sampledPoints;
      }
      
      return filteredPoints;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error("Error filtering data by time range:", error);
      return [];
    }
  }, [data, timeRange]);

  return {
    timeRange,
    setTimeRange,
    filteredData,
    isLoading,
    error
  };
}

export default useTimeRangeData;
