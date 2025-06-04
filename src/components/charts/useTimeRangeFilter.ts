"use client";

import { useState, useMemo, useEffect } from "react";
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
  
  // Update timeRange when initialTimeRange changes
  useEffect(() => {
    setTimeRange(initialTimeRange);
  }, [initialTimeRange]);

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log(`useTimeRangeFilter: No data to filter for timeRange ${timeRange}`);
      return [];
    }

    // First sort all data by date
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    console.log(`useTimeRangeFilter: Filtering ${sortedData.length} data points for timeRange ${timeRange}`);
    console.log(`useTimeRangeFilter: First date: ${sortedData[0]?.date}, Last date: ${sortedData[sortedData.length-1]?.date}`);
    
    // Use the latest date in the dataset as the reference point
    // This ensures we always show data relative to the most recent point
    const latestDate = sortedData.length > 0 ? new Date(sortedData[sortedData.length - 1].date) : new Date();
    
    // Strict filtering based on time range - no fallbacks
    if (timeRange === "1D") {
      // For 1D, show the last 24 hours from the latest date
      const oneDayAgo = new Date(latestDate);
      oneDayAgo.setHours(latestDate.getHours() - 24);
      
      // Filter data points within the 1D range
      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneDayAgo
      );
      
      console.log(`useTimeRangeFilter: 1D - Found ${filteredPoints.length} points in range`);
      return filteredPoints;
    }

    if (timeRange === "1W") {
      // For 1W, show the last 7 days from the latest date
      const oneWeekAgo = new Date(latestDate);
      oneWeekAgo.setDate(latestDate.getDate() - 7);
      
      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneWeekAgo
      );
      
      console.log(`useTimeRangeFilter: 1W - Found ${filteredPoints.length} points in range`);
      return filteredPoints;
    }

    if (timeRange === "1M") {
      // For 1M, show the last 30 days from the latest date
      const oneMonthAgo = new Date(latestDate);
      oneMonthAgo.setDate(latestDate.getDate() - 30);
      
      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneMonthAgo
      );
      
      console.log(`useTimeRangeFilter: 1M - Found ${filteredPoints.length} points in range`);
      return filteredPoints;
    }

    // 1Y view - show the last year from the latest date
    const oneYearAgo = new Date(latestDate);
    oneYearAgo.setFullYear(latestDate.getFullYear() - 1);
    
    const filteredPoints = sortedData.filter(
      (point) => new Date(point.date) >= oneYearAgo
    );
    
    console.log(`useTimeRangeFilter: 1Y - Found ${filteredPoints.length} points in range`);
    return filteredPoints;
  }, [data, timeRange]);

  return {
    timeRange,
    setTimeRange,
    filteredData,
  };
}

export default useTimeRangeFilter;
