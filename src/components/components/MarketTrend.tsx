"use client";

import { useRouter } from "next/navigation";
import CircularImage from "../ui/CircularImage";
import { useAppContext } from "@/components/Context";
import { hashBet } from "@/components/bets/Betv2";
import { TIME_RANGES, TimeRangeOption } from "../charts/ChartConfig";
import ProbabilityLineChart from "../charts/ProbabilityLineChart";
import TimeRangeSelector from "../charts/TimeRangeSelector";
import { useTimeRangeData } from "../charts/hooks/useTimeRangeData";

export type MarketTrendData = {
  id: string;
  title: string;
  probability: number;
  probabilityChange: string;
  history: { date: string; probability: number }[];
  image: string;
};

export type MarketTrendsProps = {
  markets: MarketTrendData[];
};

export default function MarketTrend({ markets }: MarketTrendsProps) {
  const router = useRouter();
  const { bets: [, setBets], show: [, setShow] } = useAppContext();

  // Validate markets before using them
  const isValidMarkets = Array.isArray(markets);
  const selectedMarket = isValidMarkets && markets.length === 1 ? markets[0] : null;
  
  // Call hooks unconditionally at the top level
  const { timeRange, setTimeRange, filteredData, isLoading, error } = useTimeRangeData(
    selectedMarket?.history || [],
    "1W"
  );

  // Return null after hooks if conditions aren't met
  if (!isValidMarkets || !selectedMarket) return null;

  const handleBet = (betType: "yes" | "no") => {
    if (!selectedMarket?.id || !selectedMarket?.title) return;

    const bet = {
      id: hashBet({
        date: new Date(),
        title: selectedMarket.title,
      }),
      chosen: betType === "yes" ? "Yes" : "No",
      bet: betType,
      match: selectedMarket.title,
      odds: selectedMarket.probability,
    };

    setBets((bets) => [bet, ...bets]);
    setShow(true);
  };

  const handleLinkClick = () => {
    router.push(`/events/${selectedMarket.id}`);
  };

  const isPositive = selectedMarket.probabilityChange.startsWith("+");

  return (
    <div className="flex-grow text-white p-3 space-y-2 rounded-xl bg-gray-800" onClick={handleLinkClick}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col ">
          <div className="flex items-center space-x-2 cursor-pointer">
            <CircularImage
              src={selectedMarket.image || ""}
              alt="flag"
              size={40}
            />
            <div className="flex justify-between grow">
              <div className="flex w-3/4 mr-auto items-center">
                <p className="text-white font-bold text-sm ">
                  {selectedMarket.title}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-chipz-gray-light text-sm font-bold">
              {selectedMarket.probability}% chance
            </p>
          </div>
        </div>
      </div>
      
      <ProbabilityLineChart 
        data={filteredData} 
        isPositive={isPositive}
        timeRange={timeRange}
        loading={isLoading}
        error={error}
      />

      <TimeRangeSelector
        timeRange={timeRange as TimeRangeOption}
        setTimeRange={setTimeRange}
        availableRanges={TIME_RANGES.default}
        stopPropagation={true}
      />

      <div className="flex w-11/12 mx-auto">
        <div className="flex justify-between gap-2 my-3 w-full">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleBet("yes");}}
            className="bg-[#111827] text-green-500 text-bb-black py-1 px-4 rounded-lg text-xs border border-green-500 w-[142px] h-[28px]"
          >
            Buy Yes {selectedMarket.probability}$
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleBet("no")
            }}
            className="bg-[#111827] text-red-500 text-bb-black py-1 px-4 rounded-lg text-xs border border-red-600 w-[142px] h-[28px]"
          >
            Buy No {selectedMarket.probability}$
          </button>
        </div>
      </div>
    </div>
  );
}
