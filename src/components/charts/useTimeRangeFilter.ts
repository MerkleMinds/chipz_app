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

    const now = new Date();

    if (timeRange === "1D") {
      const oneDayAgo = new Date(now);
      oneDayAgo.setHours(now.getHours() - 24);

      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneDayAgo
      );

      // If we have less than 2 points for the day, show at least 2 points
      return filteredPoints.length < 2 ? sortedData.slice(-2) : filteredPoints;
    }

    if (timeRange === "1W") {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);

      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneWeekAgo
      );

      return filteredPoints.length < 2 ? sortedData.slice(-7) : filteredPoints;
    }

    if (timeRange === "1M") {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setDate(now.getDate() - 30);

      const filteredPoints = sortedData.filter(
        (point) => new Date(point.date) >= oneMonthAgo
      );

      return filteredPoints.length < 2 ? sortedData : filteredPoints;
    }

    // 1Y view
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const filteredPoints = sortedData.filter(
      (point) => new Date(point.date) >= oneYearAgo
    );

    return filteredPoints.length < 2 ? sortedData : filteredPoints;
  }, [data, timeRange]);

  return {
    timeRange,
    setTimeRange,
    filteredData,
  };
}

export default useTimeRangeFilter;
