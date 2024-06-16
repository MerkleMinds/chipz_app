"use client";
import { useState } from "react";
import { type IBet } from "./Bet";

interface ICheckout {
  bets: IBet[];
}

export default function Checkout({ bets }: ICheckout) {
  const [money, setMoney] = useState("");
  const totalOdds = bets.reduce((acc, bet) => acc * bet.odds, 1);
  const totalMoneyToWin = money ? (+money * totalOdds).toFixed(2) : "0.00";

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full mx-auto bg-gray-900 rounded-lg p-4 pt-2">
      <h2 className="text-2xl font-bold mb-4 text-gray-100 font-just">
        Checkout
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row w-full"
      >
        <div className="flex-1 mb-4 sm:mr-4">
          <label
            className="block text-gray-400 font-medium mb-2 font-just"
            htmlFor="total-odds"
          >
            Total Odds
          </label>
          <div
            id="total-odds"
            className="p-2 bg-gray-800 rounded-md text-gray-100"
          >
            {totalOdds.toFixed(2)}
          </div>
        </div>
        <div className="flex-1 mb-4 sm:mr-4">
          <label
            className="block text-gray-400 font-medium mb-2 font-just"
            htmlFor="money"
          >
            Your Bet
          </label>
          <input
            type="number"
            id="money"
            className="w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-bb-success bg-gray-800 text-white"
            value={money}
            onChange={handleMoneyChange}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="flex-1 mb-4 sm:mr-4">
          <label
            className="block text-gray-400 font-medium mb-2 font-just"
            htmlFor="total-money-to-win"
          >
            Money to Win
          </label>
          <div
            id="total-money-to-win"
            className="p-2 bg-gray-800 rounded-md text-gray-100"
          >
            ${totalMoneyToWin}
          </div>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto py-2 px-4 bg-bb-success text-white font-semibold rounded-md hover:bg-bb-success focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Checkout
        </button>
      </form>
    </div>
  );
}
