"use client";

import { useState, useMemo } from "react";
import { TimeRangeOption } from "./ChartConfig";

interface DataPoint {
  date: string;
  [key: string]: any;
}

export function useTimeRangeFilter<T extends DataPoint>(
  data: T[],
  initialTimeRange: TimeRangeOption = "1W"
) {
  const [timeRange, setTimeRange] = useState<TimeRangeOption>(initialTimeRange);

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    // First sort all data by date
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    
    // Use current date as the reference point for filtering
    const now = new Date();
    
    if (timeRange === "1D") {
      // For 1D, show the last 24 hours from now
      const oneDayAgo = new Date(now);
      oneDayAgo.setHours(now.getHours() - 24);
      
      // If no data points fall within the 1D range, return the most recent data points
      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneDayAgo
      );
      
      if (filteredPoints.length === 0) {
        // If no points in range, show the most recent points (up to 5)
        return sortedData.slice(-5);
      }
      
      return filteredPoints;
    }

    if (timeRange === "1W") {
      // For 1W, show the last 7 days from now
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      
      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneWeekAgo
      );
      
      if (filteredPoints.length === 0) {
        // If no points in range, show the most recent points (up to 10)
        return sortedData.slice(-10);
      }
      
      return filteredPoints;
    }

    if (timeRange === "1M") {
      // For 1M, show the last 30 days from now
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setDate(now.getDate() - 30);
      
      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneMonthAgo
      );
      
      if (filteredPoints.length === 0) {
        // If no points in range, show all available data
        return sortedData;
      }
      
      return filteredPoints;
    }

    // 1Y view - show the last year from now
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    
    const filteredPoints = sortedData.filter(
      (point) => new Date(point.date) >= oneYearAgo
    );
    
    if (filteredPoints.length === 0) {
      // If no points in range, show all available data
      return sortedData;
    }
    
    return filteredPoints;
  }, [data, timeRange]);

  return {
    timeRange,
    setTimeRange,
    filteredData,
  };
}

export default useTimeRangeFilter;
