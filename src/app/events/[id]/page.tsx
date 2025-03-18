"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { FaChevronDown } from "react-icons/fa6";
import MarketTrendEventPage from "@/components/components/MarketTrendEventPage";
import data from "@/utils/data/events.json" with { type: "json" };
import { CiBookmark } from "react-icons/ci";

interface PageProps {
  params: {
    id: string;
  }
}

interface OrderBook {
  id: number;
  title: string;
  probability: number;
}

interface Event {
  id: number;
  title: string;
  probability: number;
  totalVolume: string;
  imageUrl: string;
  orderBook: OrderBook[];
  conditional: string;
}

interface MainPageProps {
  data: Event;
}

interface BuyButtonsProps {
  yesPrice: number;
  noPrice: number;
}

const BuyButtons = ({ yesPrice, noPrice }: BuyButtonsProps) => {
  return (
    <div className="fixed bottom-[64px] left-0 right-0 p-4 bg-gray-900 border border-[#A3A3A3] z-10">
      <div className="flex gap-4 max-w-lg mx-auto">
        <button className="flex-1 py-3 px-4 rounded-lg border border-green-500 text-green-500 hover:bg-green-500/10">
          Buy Yes {yesPrice}$
        </button>
        <button className="flex-1 py-3 px-4 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10">
          Buy No {noPrice}$
        </button>
      </div>
    </div>
  );
};

interface OrderRowProps {
  orders: { price: string, shares: number, total: string, volume: number }[];
  color: string;
  lastPrice: string;
}

const OrderRow = ({ orders, color, lastPrice }: OrderRowProps) => (
  <div className="space-y-1">
    {orders.map((order: { price: string, shares: number, total: string, volume: number }) => (
      <div key={order.price} className={`flex items-center ${color}`}>
        <div className="relative h-6 flex-grow">
          <div 
            className={`absolute left-0 top-0 h-full ${order.price > lastPrice ? 'bg-green-500/20' : 'bg-red-500/20'}`}
            style={{ width: `${order.volume}%` }}
          />
        </div>
        <div className="grid grid-cols-4 gap-y-4 w-full">
          <div className="relative h-6">
            <div 
              className={`absolute left-0 top-0 h-full ${order.price > lastPrice ? 'bg-green-500/20' : 'bg-red-500/20'}`}
              style={{ width: `${order.volume}%` }}
            />
          </div>
          <span className="justify-self-center">{order.price}</span>
          <span className="justify-self-center">{order.shares}</span>
          <span className="justify-self-center">{order.total}</span>
        </div>
      </div>
    ))}
  </div>
);

const OrderBookPart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no'>('yes');

  const sampleMarkets = {
    yes: {
      id: "1",
      lastPrice: "0.50",
      spread: "0.02",
      asks: [
        { price: "0.52", shares: 100, total: "$52.00", volume: 80 },
        { price: "0.54", shares: 150, total: "$81.00", volume: 60 },
        { price: "0.56", shares: 200, total: "$112.00", volume: 40 }
      ],
      bids: [
        { price: "0.48", shares: 120, total: "$57.60", volume: 70 },
        { price: "0.46", shares: 180, total: "$82.80", volume: 50 },
        { price: "0.44", shares: 250, total: "$110.00", volume: 30 }
      ]
    },
    no: {
      id: "2",
      lastPrice: "0.45",
      spread: "0.03",
      asks: [
        { price: "0.47", shares: 90, total: "$42.30", volume: 75 },
        { price: "0.49", shares: 130, total: "$63.70", volume: 55 },
        { price: "0.51", shares: 180, total: "$91.80", volume: 35 }
      ],
      bids: [
        { price: "0.44", shares: 110, total: "$48.40", volume: 65 },
        { price: "0.42", shares: 160, total: "$67.20", volume: 45 },
        { price: "0.40", shares: 220, total: "$88.00", volume: 25 }
      ]
    }
  };

  const activeMarket = sampleMarkets[selectedOption];

  return (
    <div className="w-full border border-[#A3A3A3] rounded-lg bg-gray-800/50">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-6 flex flex-row justify-between items-center cursor-pointer"
      >
        <h2 className="text-lg">Order Book</h2>
        <div className="flex items-center">
          <FaChevronDown 
            size={18} 
            className={`text-gray-400 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>
      <div className={`bg-gray-800/50 transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-4">
          <div className="flex space-x-4 mb-4 border-b border-gray-700">
            <button
              onClick={() => setSelectedOption('yes')}
              className={`px-4 py-2 font-medium ${
                selectedOption === 'yes'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setSelectedOption('no')}
              className={`px-4 py-2 font-medium ${
                selectedOption === 'no'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              No
            </button>
          </div>

          <div className="grid grid-cols-4 gap-y-4 text-gray-400 text-sm font-medium mb-2">
            <span>Trade {selectedOption}</span> 
            <span className="justify-self-center">Price</span>
            <span className="justify-self-center">Shares </span>
            <span className="justify-self-center">Total</span>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-y-4">
            <div className="space-y-2">
              <OrderRow orders={activeMarket.asks} color="text-red-500" lastPrice={activeMarket.lastPrice} />
              <div className="text-gray-400 text-sm py-2">
                Spread: {activeMarket.spread}
              </div>
              <OrderRow orders={activeMarket.bids} color="text-green-500" lastPrice={activeMarket.lastPrice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketTrendPart = () => {
  return (
    <div className="w-full border border-[#A3A3A3] rounded-lg min-h-[250px]">
      <MarketTrendEventPage 
        market={{
          id: "1",
          probabilityChange: "+5.2",
          history: [
            { date: "2024-01-01", probability: 45 },
            { date: "2024-01-02", probability: 50 },
            { date: "2024-01-03", probability: 55 },
            { date: "2024-01-04", probability: 60 },
            { date: "2024-01-05", probability: 65 },
            { date: "2024-01-06", probability: 70 },
            { date: "2024-01-07", probability: 75 },
            { date: "2024-01-08", probability: 80 },
          ]
        }} 
      />
    </div>
  );
};

const MainPage = ({ data }: MainPageProps) => {
  return (
    <div className="flex flex-col mx-3 mt-2 gap-3 text-white">
      <div className="flex flex-row justify-between">
      <img
        src={data.imageUrl}
        alt="event-banner"
        className="w-[45px] h-[45px] object-cover"
        />
        <CiBookmark className="text-12" />
        </div>
      <h2 className="text-white text-lg font-bold">{data.title}</h2>
	  <div className="flex flex-col">
		<div className="flex text-xs">
      {data.conditional === "yes" ? <p>Yes</p> : <p>No</p>}
		</div>
		<h2 className="text-white text-lg font-bold">{data.probability}% chance</h2>
	  </div>
	  <MarketTrendPart />
	  <OrderBookPart />
    </div>
  );
};

export default function Page({ params }: PageProps) {
  const event = data.find(event => event.id.toString() === params.id);
  
  if (!event) return null;
  // TODO: return 404 if event is not found

  return (
    <main className="flex flex-col gap-5 pb-20">
      <MainPage data={event} />
      <Partners />

      <Footer />
      <BuyButtons yesPrice={50} noPrice={53} />
    </main>
  );
}
