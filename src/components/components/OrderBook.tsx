"use client";

import { useState } from "react";
import { FaChevronDown } from 'react-icons/fa6';

// Define the Order and OrderBook types based on provided interfaces
type Order = {
  price: string;
  shares: number;
  total: string;
  volume: number;
};

interface OrderBookSide {
  lastPrice: string;
  spread: string;
  asks: Order[];
  bids: Order[];
}

export interface OrderBook {
  yes: OrderBookSide;
  no: OrderBookSide;
}

// Sample order book data for demonstration
const sampleOrderBook: OrderBook = {
  yes: {
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

// Props for the OrderBookPart component
interface OrderBookPartProps {
  orderBookData?: OrderBook;
}

interface OrderRowProps {
  orders: Order[];
  color: string;
  lastPrice: string;
}

const OrderRow = ({ orders, color, lastPrice }: OrderRowProps) => (
  <div className="space-y-1">
    {orders.map((order, index) => (
      <div key={index} className={`flex items-center ${color}`}>
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

export const OrderBookPart: React.FC<OrderBookPartProps> = ({ orderBookData = sampleOrderBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no'>('yes');

  // Use the passed-in orderBookData or the sample data if none provided
  const activeMarket = orderBookData[selectedOption];

  // Handle cases where orderBookData might be missing or incomplete
  if (!activeMarket) {
    return <div className="text-white p-4">Loading order book...</div>;
  }

  return (
    <div className="w-full border border-chipz-gray-light rounded-lg bg-gray-800/50">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-6 flex flex-row justify-between items-center cursor-pointer"
      >
        <h2 className="text-lg text-white">Order Book</h2>
        <div className="flex items-center">
          <FaChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
              }`}
          />
        </div>
      </div>
      <div className={`bg-gray-800/50 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="p-4">
          <div className="flex space-x-4 mb-4 border-b border-gray-700">
            <button
              onClick={() => setSelectedOption('yes')}
              className={`px-4 py-2 font-medium ${selectedOption === 'yes'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-gray-300'
                }`}
            >
              Yes
            </button>
            <button
              onClick={() => setSelectedOption('no')}
              className={`px-4 py-2 font-medium ${selectedOption === 'no'
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
              <div className="border border-gray-700" />
              <OrderRow orders={activeMarket.bids} color="text-green-500" lastPrice={activeMarket.lastPrice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the main component for use elsewhere
export default OrderBookPart;
