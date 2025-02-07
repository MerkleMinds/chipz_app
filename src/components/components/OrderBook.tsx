"use client";

import { useState } from "react";

export type Order = {
  price: string;
  shares: number;
  total: string;
};

export type OrderBookItem = {
  id: string;
  lastPrice: string;
  spread: string;
  asks: Order[];
  bids: Order[];
};

export type OrderBookProps = {
  markets: OrderBookItem[];
};

export default function OrderBookBox({ markets }: OrderBookProps) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      {markets.map((market) => (
        <MarketOrderBook key={market.id} market={market} />
      ))}
    </div>
  );
}

function MarketOrderBook({ market }: { market: OrderBookItem }) {
  const [tradeType, setTradeType] = useState<"yes" | "no">("yes");

  return (
    <div className="mb-6 p-4 border border-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Order Book</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setTradeType("yes")}
            className={`px-3 py-1 rounded ${
              tradeType === "yes" ? "bg-gray-700 text-white" : "text-gray-500"
            }`}
          >
            Trade Yes
          </button>
          <button
            onClick={() => setTradeType("no")}
            className={`px-3 py-1 rounded ${
              tradeType === "no" ? "bg-gray-700 text-white" : "text-gray-500"
            }`}
          >
            Trade No
          </button>
        </div>
      </div>

      <div className="text-sm">
        <div className="grid grid-cols-4 text-gray-500 mb-1 px-2">
          <span className="text-left">Type</span>
          <span className="text-right">Price</span>
          <span className="text-right">Shares</span>
          <span className="text-right">Total</span>
        </div>

        <div className="text-red-500">
          {market.asks.map((ask, index) => (
            <div key={index} className="grid grid-cols-4 px-2 py-1">
              <span className="text-left">Asks</span>
              <span className="text-right">{ask.price}</span>
              <span className="text-right">{ask.shares.toFixed(2)}</span>
              <span className="text-right">{ask.total}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 text-gray-400 py-1 px-2">
          <span className="text-left">Last: {market.lastPrice}</span>
          <span className="text-right">Spread: {market.spread}</span>
        </div>

        <div className="text-green-500">
          {market.bids.map((bid, index) => (
            <div key={index} className="grid grid-cols-4 px-2 py-1">
              <span className="text-left">Bids</span>
              <span className="text-right">{bid.price}</span>
              <span className="text-right">{bid.shares.toFixed(2)}</span>
              <span className="text-right">{bid.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
