"use client";

import React from "react";
import { TimeRangeOption } from "./ChartConfig";

interface TimeRangeSelectorProps {
  timeRange: TimeRangeOption;
  setTimeRange: (range: TimeRangeOption) => void;
  availableRanges?: TimeRangeOption[];
  stopPropagation?: boolean;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  timeRange,
  setTimeRange,
  availableRanges = ["1D", "1W", "1M"],
  stopPropagation = true,
}) => {
  const handleClick = (e: React.MouseEvent, range: TimeRangeOption) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    setTimeRange(range);
  };

  return (
    <div className="flex mb-2">
      {availableRanges.map((range) => (
        <button
          key={range}
          onClick={(e) => handleClick(e, range)}
          className={`text-xs rounded-xl border-xl w-[27px] h-[17px] ${
            timeRange === range
              ? "bg-chipz-gray-light text-bb-black"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
