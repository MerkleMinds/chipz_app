import { useState, useEffect } from "react";
import { hashBet } from "@/components/bets/Betv2";
import BetDetails, { BetBasev2 } from "./BetDetails";
import BalanceOverview from "./BalanceOverview";
import HistoryPnlGraph, { BalanceHistoryPoint } from "./HistoryPnlGraph";

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

// Generate sample balance history data for the PnL graph
const generateBalanceHistory = (days: number, startBalance: number): BalanceHistoryPoint[] => {
  const history: BalanceHistoryPoint[] = [];
  const now = new Date();
  let currentBalance = startBalance;
  
  // Create data points with different densities and patterns
  
  // Last 24 hours - hourly data points with high volatility
  let dailyTrend = Math.random() > 0.5 ? 1 : -1; // Random trend direction for the day
  for (let i = 24; i >= 0; i--) {
    const date = new Date(now);
    date.setHours(now.getHours() - i);
    
    // More volatile changes for hourly data
    const volatility = 15; // Higher volatility for 1D view
    const change = (Math.random() * volatility - volatility/2) + (dailyTrend * volatility/4);
    currentBalance += change;
    
    history.push({
      date: date.toISOString(),
      balance: parseFloat(currentBalance.toFixed(2))
    });
    
    // Occasionally change trend direction within the day
    if (i % 6 === 0) {
      dailyTrend = Math.random() > 0.7 ? -dailyTrend : dailyTrend;
    }
  }
  
  // Last week - daily data points with medium volatility
  let weeklyTrend = Math.random() > 0.5 ? 1 : -1; // Random trend for the week
  for (let i = 1; i <= 6; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    date.setHours(12, 0, 0, 0); // Noon
    
    // Medium volatility for weekly data
    const volatility = 30;
    const change = (Math.random() * volatility - volatility/2) + (weeklyTrend * volatility/3);
    currentBalance += change;
    
    history.push({
      date: date.toISOString(),
      balance: parseFloat(currentBalance.toFixed(2))
    });
    
    // Occasionally change trend direction within the week
    if (i % 3 === 0) {
      weeklyTrend = Math.random() > 0.6 ? -weeklyTrend : weeklyTrend;
    }
  }
  
  // Rest of the month - every 2-3 days with lower volatility but larger trends
  let monthlyTrend = Math.random() > 0.5 ? 1 : -1; // Random trend for the month
  for (let i = 7; i <= 30; i += 2) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    date.setHours(12, 0, 0, 0); // Noon
    
    // Lower volatility but stronger trends for monthly data
    const volatility = 40;
    const change = (Math.random() * volatility - volatility/2) + (monthlyTrend * volatility/2);
    currentBalance += change;
    
    history.push({
      date: date.toISOString(),
      balance: parseFloat(currentBalance.toFixed(2))
    });
    
    // Less frequent trend changes for monthly view
    if (i % 8 === 0) {
      monthlyTrend = Math.random() > 0.4 ? -monthlyTrend : monthlyTrend;
    }
  }
  
  // Yearly data - create data points for the rest of the year with distinct seasonal patterns
  if (days > 30) {
    // Create several market cycles throughout the year
    const yearCycles = 4; // Approximately quarterly cycles
    const cycleLength = Math.floor(365 / yearCycles);
    
    for (let cycle = 0; cycle < yearCycles; cycle++) {
      // Each cycle has a distinct trend
      const cycleTrend = cycle % 2 === 0 ? 1 : -1; // Alternating up/down cycles
      const cycleStartDay = 31 + (cycle * cycleLength);
      const cycleEndDay = Math.min(days, cycleStartDay + cycleLength);
      
      // Create points for this cycle (every ~7 days)
      for (let i = cycleStartDay; i <= cycleEndDay; i += 7) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        date.setHours(12, 0, 0, 0);
        
        // Yearly data has larger trends and lower day-to-day volatility
        const baseVolatility = 60;
        
        // Create a cycle pattern (first third rising, middle third stable, last third falling)
        const cycleProgress = (i - cycleStartDay) / cycleLength;
        let trendMultiplier;
        
        if (cycleProgress < 0.33) {
          // Rising phase
          trendMultiplier = cycleTrend * 1.5;
        } else if (cycleProgress < 0.66) {
          // Stable phase
          trendMultiplier = cycleTrend * 0.2;
        } else {
          // Falling phase
          trendMultiplier = -cycleTrend * 1.0;
        }
        
        const change = (Math.random() * baseVolatility - baseVolatility/2) + (trendMultiplier * baseVolatility/2);
        currentBalance += change;
        
        history.push({
          date: date.toISOString(),
          balance: parseFloat(currentBalance.toFixed(2))
        });
      }
      
      // Add a significant event at the end of each cycle (big spike or drop)
      if (cycle < yearCycles - 1) { // Skip for the last cycle
        const eventDate = new Date(now);
        eventDate.setDate(now.getDate() - (cycleStartDay + cycleLength - 1));
        eventDate.setHours(12, 0, 0, 0);
        
        // Major market event (big move up or down)
        const eventDirection = Math.random() > 0.5 ? 1 : -1;
        const eventMagnitude = Math.random() * 150 + 50; // Between 50-200 point move
        
        currentBalance += eventDirection * eventMagnitude;
        
        history.push({
          date: eventDate.toISOString(),
          balance: parseFloat(currentBalance.toFixed(2))
        });
      }
    }
  }

  // Sort by date (oldest to newest)
  return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export default function History() {
  const [history, setHistory] = useState<IHistoryEntry[]>([]);
  const [balanceHistory, setBalanceHistory] = useState<BalanceHistoryPoint[]>([]);

  const totalBalance =
    history
      .filter((h) => h.type === "deposit")
      .reduce((acc, h) => acc + h.amount, 0) -
    history
      .filter((h) => h.type === "withdraw")
      .reduce((acc, h) => acc + h.amount, 0);

  useEffect(() => {
    setHistory(createHistoryEntries(5));
    // Generate 365 days of balance history data for 1Y view
    setBalanceHistory(generateBalanceHistory(365, 1000));
  }, []);

  return (
    <div className="mb-6">
      <HistoryPnlGraph totalBalance={totalBalance} balanceHistory={balanceHistory}/>
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
