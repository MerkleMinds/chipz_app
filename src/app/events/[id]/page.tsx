"use client";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import MarketTrendEventPage from "@/components/components/MarketTrendEventPage";
import OrderBookPart from "@/components/components/OrderBook";
import MultiOptionBet from "@/components/components/MultiOptionBet";
import MultiOptionTrendChart from "@/components/components/MultiOptionTrendChart";
import { getEventById, getOrderBookForEvent, getMarketTrend } from "@/utils/data/dataService";
import { Event as EventType } from "@/utils/data/types";
import Image from "next/image";
import { useState } from "react";

interface PageProps {
  params: {
    id: string;
  }
}

interface MainPageProps {
  data: EventType;
  selectedOptionId?: string;
  onOptionChange?: (optionId: string) => void;
}

interface BuyButtonsProps {
  event: EventType;
  selectedOptionId?: string;
}

const BuyButtons = ({ event, selectedOptionId }: BuyButtonsProps) => {
  // For simple yes/no bets
  if (!event.options || event.options.length === 0) {
    const yesPrice = event.probability;
    const noPrice = 100 - event.probability;
    
    return (
      <div className="fixed bottom-[64px] border border-opacity-50 border-chipz-gray-light left-0 right-0 z-10 bg-gray-900 p-4">
        <div className="w-full max-w-sm mx-auto">
          <div className="flex gap-4">
            <button className="flex-1 py-3 px-4 rounded-lg bg-transparent border border-green-500 text-green-500 hover:bg-green-500/10">
              Buy Yes {yesPrice}$
            </button>
            <button className="flex-1 py-3 px-4 rounded-lg bg-transparent border border-red-500 text-red-500 hover:bg-red-500/10">
              Buy No {noPrice}$
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // For multi-option bets
  const selectedOption = selectedOptionId 
    ? event.options.find(opt => opt.id === selectedOptionId)
    : event.options[0];
    
  if (!selectedOption) return null;
  
  const optionPrice = selectedOption.probability;
  const oppositePrice = 100 - optionPrice;
  
  return (
    <div className="fixed bottom-[64px] border border-opacity-50 border-chipz-gray-light left-0 right-0 z-10 bg-gray-900 p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex gap-4">
          <button className="flex-1 py-3 px-4 rounded-lg bg-transparent border border-green-500 text-green-500 hover:bg-green-500/10">
            Buy {selectedOption.title} {optionPrice}$
          </button>
          <button className="flex-1 py-3 px-4 rounded-lg bg-transparent border border-red-500 text-red-500 hover:bg-red-500/10">
            Sell {selectedOption.title} {oppositePrice}$
          </button>
        </div>
      </div>
    </div>
  );
};

const SimpleYesNoBet = ({ event }: { event: EventType }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <div className="flex text-xs">
          {event.conditional === "yes" ? <p>Yes</p> : <p>No</p>}
        </div>
        <h2 className="text-white text-lg font-bold">{event.probability}% chance</h2>
      </div>
      <div className="w-full min-h-[250px]">
        <MarketTrendEventPage 
          market={getMarketTrend(event.id)}
        />
      </div>
      <OrderBookPart orderBookData={getOrderBookForEvent(event.id)} />
    </div>
  );
};

const MainPage = ({ data, selectedOptionId, onOptionChange }: MainPageProps) => {
  const isMultiOptionBet = data.options && data.options.length > 0;
  
  return (
    <div className="flex flex-col mx-3 mt-2 gap-3 text-white">
      <div className="flex flex-row justify-between">
        <Image
          src={data.imageUrl}
          alt="event-banner"
          className="object-cover"
          width={45}
          height={45}
        />
      </div>
      <h2 className="text-white text-lg font-bold">{data.title}</h2>
      
      {isMultiOptionBet ? (
        <div className="flex flex-col gap-4">
          {/* Combined chart showing all options */}
          <MultiOptionTrendChart event={data} />
          
          {/* Individual option selector and details */}
          <MultiOptionBet 
            event={data}
            selectedOptionId={selectedOptionId}
            onOptionChange={onOptionChange}
          />
        </div>
      ) : (
        <SimpleYesNoBet event={data} />
      )}
    </div>
  );
};

export default function Page({ params }: PageProps) {
  const event = getEventById(params.id);
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    event?.options && event.options.length > 0 ? event.options[0].id : undefined
  );
  
  if (!event) return null;
  // TODO: return 404 if event is not found

  // Handle option change
  const handleOptionChange = (optionId: string) => {
    setSelectedOptionId(optionId);
  };

  return (
    <main className="flex flex-col gap-5 pb-20">
      <MainPage data={event} selectedOptionId={selectedOptionId} onOptionChange={handleOptionChange} />
      <Partners />
      <Footer />
      <BuyButtons event={event} selectedOptionId={selectedOptionId} />
    </main>
  );
}
