"use client";

import { useState, useMemo } from "react";
import { Event } from "@/utils/data/types";
import MultiOptionLineChart from "../charts/MultiOptionLineChart";
import TimeRangeSelector from "../charts/TimeRangeSelector";
import { TIME_RANGES, TimeRangeOption, CHART_SIZES } from "../charts/ChartConfig";
import useTimeRangeFilter from "../charts/useTimeRangeFilter";

interface MultiOptionTrendChartProps {
  event: Event;
}

const MultiOptionTrendChart: React.FC<MultiOptionTrendChartProps> = ({ event }) => {
  const [timeRange, setTimeRange] = useState<TimeRangeOption>("1W");

  // Generate a color based on index
  const getLineColor = (index: number): string => {
    const colors = [
      "#5BD387", // Green (lighter)
      "#6DA0F8", // Blue (lighter)
      "#F37272", // Red (lighter)
      "#F9B649", // Orange (lighter)
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
    
    return result;
  }, [event.options]);

  // Apply time range filtering to the combined data
  const { filteredData, setTimeRange: updateTimeRange } = useTimeRangeFilter(combinedData, timeRange);
  
  // Handle time range change
  const handleTimeRangeChange = (newRange: TimeRangeOption) => {
    setTimeRange(newRange);
    updateTimeRange(newRange);
  };

  if (!event.options || event.options.length === 0) {
    return <div className="text-white p-4">No options available for this bet.</div>;
  }

  return (
    <div className="text-white p-3 space-y-2 rounded-xl bg-bb-bg-card min-h-[250px]">
      
      <MultiOptionLineChart 
        data={filteredData}
        options={optionsForChart}
        minHeight={CHART_SIZES.minHeight}
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
