// Common chart configuration values
// Using Tailwind theme colors for consistency
export const CHART_COLORS = {
  positive: "var(--color-bb-success, #23C45E)", // Using CSS variable that matches Tailwind theme
  negative: "var(--color-bb-error, #EF4444)",
  marketPositive: "#6BD932",
  marketNegative: "#FE4E4F",
  gridStroke: "#444",
  gridFill: "var(--color-bb-bg-card, #1f2937)", // Using semantic background color
  tickColor: "#ccc",
  background: "bg-bb-bg-card", // Using semantic Tailwind class
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
  default: { left: 0, right: 0, top: 5, bottom: 0 },
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
