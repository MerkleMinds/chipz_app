"use client";

import { useState, useMemo, useEffect } from "react";
import { Event } from "@/utils/data/types";
import MultiOptionLineChart from "../charts/MultiOptionLineChart";
import TimeRangeSelector from "../charts/TimeRangeSelector";
import { TIME_RANGES, TimeRangeOption, CHART_SIZES } from "../charts/ChartConfig";

interface MultiOptionTrendChartProps {
  event: Event;
}

const MultiOptionTrendChart: React.FC<MultiOptionTrendChartProps> = ({ event }) => {
  const [timeRange, setTimeRange] = useState<TimeRangeOption>("1W");

  // Generate a color based on index
  const getLineColor = (index: number): string => {
    const colors = [
      "#23C45E", // Green
      "#3B82F6", // Blue
      "#EF4444", // Red
      "#F59E0B", // Amber
      "#8B5CF6", // Purple
      "#EC4899", // Pink
      "#10B981", // Emerald
      "#6366F1", // Indigo
    ];
    
    return colors[index % colors.length];
  };

  // Prepare options data for the chart
  const optionsForChart = useMemo(() => {
    if (!event.options) return [];
    
    return event.options.map((option, index) => ({
      id: option.id || `option-${index}`,
      title: option.title,
      color: getLineColor(index)
    }));
  }, [event.options]);

  // Combine all history data into a single dataset
  const combinedData = useMemo(() => {
    if (!event.options) return [];

    // Create a map of all dates across all options
    const dateMap = new Map<string, any>();
    
    // First, collect all unique dates
    event.options.forEach(option => {
      if (option.historyData) {
        option.historyData.forEach(point => {
          if (!dateMap.has(point.date)) {
            dateMap.set(point.date, { date: point.date });
          }
        });
      }
    });
    
    // Then, add probability values for each option
    event.options.forEach(option => {
      if (option.historyData && option.id) {
        option.historyData.forEach(point => {
          const entry = dateMap.get(point.date);
          if (entry) {
            entry[option.id as string] = point.probability;
          }
        });
      }
    });
    
    // Convert map to array and sort by date
    const result = Array.from(dateMap.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    console.log("Combined data points:", result.length);
    console.log("First point:", result[0]);
    console.log("Last point:", result[result.length - 1]);
    
    return result;
  }, [event.options]);
  
  // Filter data based on selected time range without using the hook
  const filteredData = useMemo(() => {
    if (!combinedData || combinedData.length === 0) {
      console.log("No combined data to filter");
      return [];
    }
    
    // Get the latest date in the dataset
    const latestDate = new Date(combinedData[combinedData.length - 1].date);
    console.log(`Latest date in dataset: ${latestDate.toISOString()}`);
    
    let result = [];
    
    // Filter based on time range
    if (timeRange === "1D") {
      const oneDayAgo = new Date(latestDate);
      oneDayAgo.setHours(latestDate.getHours() - 24);
      console.log(`1D: Filtering from ${oneDayAgo.toISOString()} to ${latestDate.toISOString()}`);
      
      result = combinedData.filter(point => new Date(point.date) >= oneDayAgo);
    } else if (timeRange === "1W") {
      const oneWeekAgo = new Date(latestDate);
      oneWeekAgo.setDate(latestDate.getDate() - 7);
      console.log(`1W: Filtering from ${oneWeekAgo.toISOString()} to ${latestDate.toISOString()}`);
      
      result = combinedData.filter(point => new Date(point.date) >= oneWeekAgo);
    } else if (timeRange === "1M") {
      const oneMonthAgo = new Date(latestDate);
      oneMonthAgo.setDate(latestDate.getDate() - 30);
      console.log(`1M: Filtering from ${oneMonthAgo.toISOString()} to ${latestDate.toISOString()}`);
      
      result = combinedData.filter(point => new Date(point.date) >= oneMonthAgo);
    } else {
      // 1Y view
      const oneYearAgo = new Date(latestDate);
      oneYearAgo.setFullYear(latestDate.getFullYear() - 1);
      console.log(`1Y: Filtering from ${oneYearAgo.toISOString()} to ${latestDate.toISOString()}`);
      
      result = combinedData.filter(point => new Date(point.date) >= oneYearAgo);
    }
    
    console.log(`Filtered data for ${timeRange}: ${result.length} points`);
    return result;
  }, [combinedData, timeRange]);
  
  // Log filtered data whenever it changes
  useEffect(() => {
    console.log(`TimeRange: ${timeRange}, Filtered data points: ${filteredData.length}`);
    if (filteredData.length > 0) {
      console.log('First filtered point:', filteredData[0]);
      console.log('Last filtered point:', filteredData[filteredData.length - 1]);
    }
  }, [filteredData, timeRange]);

  // Handle time range change
  const handleTimeRangeChange = (newRange: TimeRangeOption) => {
    setTimeRange(newRange);
  };

  if (!event.options || event.options.length === 0) {
    return <div className="text-white p-4">No options available for this bet.</div>;
  }

  return (
    <div className="text-white p-3 space-y-2 rounded-xl bg-bb-bg-card min-h-[250px]">
      
      <MultiOptionLineChart 
        data={filteredData}
        options={optionsForChart}
        showTooltip={true}
        minHeight={CHART_SIZES.minHeight}
        timeRange={timeRange}
      />

      <TimeRangeSelector
        timeRange={timeRange}
        setTimeRange={handleTimeRangeChange}
        availableRanges={TIME_RANGES.default}
      />
    </div>
  );
};

export default MultiOptionTrendChart;
