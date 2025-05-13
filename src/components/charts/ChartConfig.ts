// Common chart configuration values
export const CHART_COLORS = {
  positive: "#23C45E",
  negative: "#EF4444",
  marketPositive: "#6BD932",
  marketNegative: "#FE4E4F",
  gridStroke: "#444",
  gridFill: "#1f2937",
  tickColor: "#ccc",
  background: "bg-gray-800",
};

export const CHART_SIZES = {
  height: "h-40",
  minHeight: "min-h-[250px]",
  dotRadius: 4,
  strokeWidth: 2,
  tickFontSize: 9,
  yAxisWidth: 30,
};

export const CHART_MARGINS = {
  default: { left: 0, right: 0, top: 5, bottom: 10 },
  withPadding: { left: 5, right: 5, top: 10, bottom: 10 },
};

export type TimeRangeOption = "1D" | "1W" | "1M" | "1Y";

export const TIME_RANGES = {
  default: ["1D", "1W", "1M"] as TimeRangeOption[],
  withYear: ["1D", "1W", "1M", "1Y"] as TimeRangeOption[],
};

export interface ChartStyleProps {
  containerClassName?: string;
  chartHeight?: string;
  margin?: { left: number; right: number; top: number; bottom: number };
}

export interface TimeRangeButtonProps {
  range: TimeRangeOption;
  selectedRange: TimeRangeOption;
  onClick: (range: TimeRangeOption) => void;
}

export const formatCurrency = (value: number): string => `${value}$`;
export const formatPercentage = (value: number): string => `${value}%`;
