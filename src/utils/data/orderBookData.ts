// OrderBook data types and dummy data for the application
import { OrderBook } from "@/components/components/OrderBook";

// Centralized dummy OrderBook data that can be used across the application
export const dummyOrderBookData: OrderBook = {
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

// Function to get OrderBook data for a specific event/market
export function getOrderBookData(eventId?: string): OrderBook {
  // In a real application, this would fetch data from an API based on the eventId
  // For now, we'll just return the dummy data, but log the eventId for future implementation
  if (eventId) {
    console.log(`Getting OrderBook data for event: ${eventId}`);
    // Future implementation would fetch specific data based on eventId
  }
  return dummyOrderBookData;
}
