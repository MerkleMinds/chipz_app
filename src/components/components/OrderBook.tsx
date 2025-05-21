"use client";

import { useState } from "react";
import { FaChevronDown } from 'react-icons/fa6';
import { dummyOrderBookData } from "@/utils/data/orderBookData";

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

// Props for the OrderBookPart component
interface OrderBookPartProps {
  orderBookData?: OrderBook;
  eventId?: string;
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

export const OrderBookPart: React.FC<OrderBookPartProps> = ({ orderBookData = dummyOrderBookData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no'>('yes');

  // Use the passed-in orderBookData or the sample data if none provided
  const activeMarket = orderBookData[selectedOption];

  // Handle cases where orderBookData might be missing or incomplete
  if (!activeMarket) {
    return <div className="text-white p-4">Loading order book...</div>;
  }

  return (
    <div className="w-full border border-opacity-50 border-chipz-gray-light rounded-lg">
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
