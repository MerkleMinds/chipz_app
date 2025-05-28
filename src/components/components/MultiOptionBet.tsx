"use client";

import { useState, useEffect } from "react";
import { Event, EventOption } from "@/utils/data/types";
import MarketTrendEventPage from "./MarketTrendEventPage";
import OrderBookPart from "./OrderBook";
import { getMarketTrend, getOrderBookForOption } from "@/utils/data/dataService";

interface MultiOptionBetProps {
  event: Event;
  selectedOptionId?: string;
  onOptionChange?: (optionId: string) => void;
}

const MultiOptionBet: React.FC<MultiOptionBetProps> = ({ event, selectedOptionId, onOptionChange }) => {
  // Find the selected option based on selectedOptionId or default to first option
  const findSelectedOption = (): EventOption | null => {
    if (!event.options || event.options.length === 0) return null;
    
    if (selectedOptionId) {
      const option = event.options.find(opt => opt.id === selectedOptionId);
      return option || event.options[0];
    }
    
    return event.options[0];
  };
  
  const [selectedOption, setSelectedOption] = useState<EventOption | null>(findSelectedOption());

  // Update local state when selectedOptionId prop changes
  useEffect(() => {
    const newSelectedOption = findSelectedOption();
    setSelectedOption(newSelectedOption);
  }, [selectedOptionId, event.options]);

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
        <h3 className="text-white text-sm mb-2">Select an option:</h3>
        <div className="flex flex-wrap gap-2">
          {event.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionChange(option)}
              className={`px-3 py-2 rounded-lg text-sm ${
                selectedOption?.id === option.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
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
            <div className="flex flex-col">
              <h2 className="text-white text-lg font-bold">{selectedOption.probability}% chance</h2>
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
