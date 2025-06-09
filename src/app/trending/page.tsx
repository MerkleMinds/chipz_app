"use client";

import TrendingContent from "@/components/TrendingContent";
import { useEffect, useState } from "react";
import { type CategoryData } from "@/utils/data/types";
import { type MarketTrendData } from "@/components/components/MarketTrend";
import * as dataService from "@/utils/data/dataService";

// Function to fetch and transform trending data using the data service
const fetchTrendingData = async () => {
  // Get trending events from the data service
  const trendingEvents = dataService.getEventsByTrending();
  
  // Create a properly structured trending data object
  return {
    categories: [
      {
        title: "Trending",
        items: {
          // Transform trending events to match the MarketTrendData interface
          trends: trendingEvents.map(event => {
            // Calculate probability change manually since the function isn't exported
            let probabilityChange = "+0";
            if (event.historyData && event.historyData.length >= 2) {
              const sortedHistory = [...event.historyData].sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              
              const latest = sortedHistory[0].probability;
              const earliest = sortedHistory[sortedHistory.length - 1].probability;
              const change = latest - earliest;
              
              probabilityChange = change >= 0 ? `+${change.toFixed(1)}` : `${change.toFixed(1)}`;
            }
            
            // Create a MarketTrendData object
            return {
              id: event.id,
              title: event.title,
              probability: event.probability,
              probabilityChange: probabilityChange,
              timeRange: "1W", // Default time range
              data: (event.historyData || []).map(item => ({
                date: new Date(item.date),
                value: item.probability
              })),
              history: event.historyData || [],
              image: event.imageUrl
            } as MarketTrendData;
          }),
        }
      }
    ]
  };
};

export default function TrendingPage() {
  const [trendingData, setTrendingData] = useState<{ categories: CategoryData[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTrendingData();
        setTrendingData(data);
      } catch (error) {
        console.error("Failed to fetch trending data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bb-accent"></div>
      </div>
    );
  }

  if (!trendingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white">Failed to load trending data. Please try again later.</p>
      </div>
    );
  }

  return <TrendingContent data={trendingData} />;
}
