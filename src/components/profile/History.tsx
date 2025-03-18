import { useState, useEffect } from "react";
import { hashBet } from "@/components/bets/Betv2";
import BetDetails, { BetBasev2 } from "./BetDetails";
import BalanceOverview from "./BalanceOverview";

interface IHistoryEntry {
  id: string;
  type: "deposit" | "withdraw";
  method: "mastercard" | "opera_minipay" | "apple_pay" | "google_pay";
  amount: number;
  date: string;
  time: string;
  state: "pending" | "processed";
}

function createHistoryEntries(count: number): IHistoryEntry[] {
  const generateEntry = (_: unknown, i: number): IHistoryEntry => {
    const date = new Date();
    const id = hashBet({ date: new Date(), title: `bet_${i}` });
    const type = Math.random() < 0.5 ? "deposit" : "withdraw";
    const amount = Math.floor(Math.random() * 500) + 50;
    const methodOptions = [
      "mastercard",
      "opera_minipay",
      "apple_pay",
      "google_pay",
    ] as const;
    const method =
      methodOptions[Math.floor(Math.random() * methodOptions.length)];
    const dateString = date.toISOString().split("T")[0];
    const timeString = `${date.getHours()}:${date.getMinutes()}`;

    return {
      id,
      type,
      method,
      amount,
      date: dateString,
      time: timeString,
      state: Math.random() < 0.3 ? "pending" : "processed",
    };
  };

  return Array.from({ length: count }, generateEntry).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

const betData: BetBasev2[] = [
  {
    title: "Romania Election",
    bet: "Elena Lasconi",
    competition: "Politics",
    date: new Date(),
    stake: 100,
    odds: 2.5,
    potential: 250,
    result: "win",
    status: "settled",
  },
  {
    title: "Romania Election",
    bet: "Elena Lasconi",
    competition: "Politics",
    date: new Date(),
    stake: 100,
    odds: 2.5,
    potential: 250,
    result: "lose",
    status: "settled",
  },
];

export default function History() {
  const [history, setHistory] = useState<IHistoryEntry[]>([]);
  const totalBalance =
    history
      .filter((h) => h.type === "deposit")
      .reduce((acc, h) => acc + h.amount, 0) -
    history
      .filter((h) => h.type === "withdraw")
      .reduce((acc, h) => acc + h.amount, 0);

  useEffect(() => {
    setHistory(createHistoryEntries(5));
  }, []);

  return (
    <div className="mb-6">
      <div className="flex flex-1 justify-between flex-row gap-2 mb-4">
        <h3 className="text-lg">Total Net Balance</h3>
        <div className="border w-[42.5%] rounded-xl h-min p-1 flex justify-end">
          <div className="flex flex-row gap-2">
            <p
              className={`text-sm ${
                totalBalance >= 0 ? "text-[#23C45E]" : "text-[#EF4444]"
              }`}
            >
              {totalBalance} $
            </p>
          </div>
        </div>
      </div>
      <h3 className="text-lg mb-4">PnL Graph</h3>
      <div className="w-full h-40 bg-gray-800 rounded-md mb-4">
        
      </div>
      <h3 className="text-lg mb-4">Transaction History</h3>
      <BalanceOverview history={history} />
      <h3 className="text-lg mb-4">Detailed Overview</h3>
      <div className="space-y-4">
        {betData.map((bet, index) => (
          <BetDetails key={index} {...bet} />
        ))}
      </div>
    </div>
  );
}
