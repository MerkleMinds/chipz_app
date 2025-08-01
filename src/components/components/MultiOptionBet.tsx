"use client";

import { useState, useEffect, useCallback } from "react";
import { Event, EventOption } from "@/utils/data/types";
import MarketTrendEventPage from "./MarketTrendEventPage";
import OrderBookPart from "./OrderBook";
import { getMarketTrend, getOrderBookForOption } from "@/utils/data/dataService";
import { FaQuestionCircle } from "react-icons/fa";

interface MultiOptionBetProps {
  event: Event;
  selectedOptionId?: string;
  onOptionChange?: (optionId: string) => void;
}

const MultiOptionBet: React.FC<MultiOptionBetProps> = ({ event, selectedOptionId, onOptionChange }) => {
  // Find the selected option based on selectedOptionId or default to first option
  const findSelectedOption = useCallback((): EventOption | null => {
    if (!event.options || event.options.length === 0) return null;

    if (selectedOptionId) {
      const option = event.options.find(opt => opt.id === selectedOptionId);
      return option || event.options[0];
    }

    return event.options[0];
  }, [event.options, selectedOptionId]);

  const [selectedOption, setSelectedOption] = useState<EventOption | null>(findSelectedOption());

  // Update local state when selectedOptionId prop changes
  useEffect(() => {
    const newSelectedOption = findSelectedOption();
    setSelectedOption(newSelectedOption);
  }, [selectedOptionId, event.options, findSelectedOption]);

  if (!event.options || event.options.length === 0) {
    return <div className="text-white p-4">No options available for this bet.</div>;
  }

  const handleOptionChange = (option: EventOption) => {
    setSelectedOption(option);
    // Propagate the change to parent component
    if (onOptionChange && option.id) {
      onOptionChange(option.id);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Option Selector */}
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-2 w-full">
          {event.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionChange(option)}
              className={`px-3 py-2 rounded-lg text-sm w-full ${selectedOption?.id === option.id
                  ? "bg-bb-bg-card text-white border border-white"
                  : "bg-bb-bg-app text-gray-300 hover:bg-bb-bg-card-hover"
                }`}
            >
              {option.title} ({option.probability}%)
            </button>
          ))}
        </div>
      </div>

      {/* Selected Option Details */}
      {selectedOption && (
        <div className="mt-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-white text-lg font-bold">{selectedOption.title}</h2>
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-white text-lg font-bold">{event.probability}% est. chances</h2>
              <div className="relative group">
                <div className="cursor-help flex items-center justify-center">
                  <FaQuestionCircle className="text-neutral-400 text-sm" />
                </div>
                <div className="absolute z-10 invisible group-hover:visible bg-bb-bg-card text-white text-sm rounded-lg p-3 w-64 bottom-full left-1/2 transform -translate-x-1/2 mb-2 shadow-lg border-white border">
                  <p>Probabilities are estimates. Actual odds may vary based on order size.</p>
                </div>
              </div>
            </div>

            {/* Market Trend Chart */}
            <div className="w-full min-h-[250px]">
              <MarketTrendEventPage
                market={getMarketTrend(event.id, selectedOption.id)}
              />
            </div>

            {/* Order Book */}
            <OrderBookPart
              orderBookData={getOrderBookForOption(event.id, selectedOption.title)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiOptionBet;
