"use client";

import Betv2, { type IBetv2, hashBet } from "@/components/bets/Betv2";
import Menu, { MenuState } from "@/components/bets/Menu";
import { getPastEvents } from "@/utils/data/dataService";

import { useState, useMemo } from "react";

const bets: IBetv2[] = [
  {
    title: "Super Bowl LVIII",
    bet: "Chiefs to win",
    competition: "NFL",
    date: new Date("2024-02-11"),
    stake: 100,
    odds: 2.5,
    potential: 250,
    kind: MenuState.OPEN,
    eventId: "ev-001", // Sample event ID for navigation
  },
  {
    title: "EuroCup Qualifiers",
    bet: "France vs. Germany - Draw",
    competition: "EuroCup",
    date: new Date("2023-09-10"),
    stake: 50,
    odds: 3.2,
    potential: 160,
    kind: MenuState.SETTLED,
    result: "win",
    eventId: "ev-002", // Sample event ID for navigation
  },
  {
    title: "LaLiga Matchday 30",
    bet: "Real Madrid to win",
    competition: "LaLiga",
    date: new Date("2023-04-15"),
    stake: 75,
    odds: 1.8,
    potential: 135,
    kind: MenuState.SETTLED,
    result: "lose",
    eventId: "ev-003", // Sample event ID for navigation
  },
  {
    title: "Premier League Matchday 20",
    bet: "Liverpool vs. Manchester United - Over 2.5 goals",
    competition: "Premier League",
    date: new Date("2023-12-22"),
    stake: 60,
    odds: 1.9,
    potential: 114,
    kind: MenuState.OPEN,
    eventId: "ev-004", // Sample event ID for navigation
  },
  {
    title: "NBA Finals Game 7",
    bet: "Lakers to win",
    competition: "NBA",
    date: new Date("2024-06-18"),
    stake: 200,
    odds: 2.1,
    potential: 420,
    kind: MenuState.OPEN,
  },
  {
    title: "ATP Wimbledon Final",
    bet: "Novak Djokovic to win",
    competition: "ATP Wimbledon",
    date: new Date("2023-07-14"),
    stake: 150,
    odds: 1.5,
    potential: 225,
    kind: MenuState.SETTLED,
    result: "win",
  },
  {
    title: "UFC 300",
    bet: "Conor McGregor to win by KO",
    competition: "UFC",
    date: new Date("2024-03-05"),
    stake: 100,
    odds: 4.0,
    potential: 400,
    kind: MenuState.OPEN,
  },
  {
    title: "FIFA World Cup Final",
    bet: "Brazil to win",
    competition: "FIFA World Cup",
    date: new Date("2023-12-18"),
    stake: 250,
    odds: 3.0,
    potential: 750,
    kind: MenuState.SETTLED,
    result: "cashout",
  },
  {
    title: "Tour de France Stage 5",
    bet: "Tadej Pogačar to win",
    competition: "Tour de France",
    date: new Date("2023-07-10"),
    stake: 80,
    odds: 2.2,
    potential: 176,
    kind: MenuState.SETTLED,
    result: "lose",
  },
  {
    title: "Cricket World Cup Final",
    bet: "India to win",
    competition: "Cricket World Cup",
    date: new Date("2023-11-25"),
    stake: 120,
    odds: 2.75,
    potential: 330,
    kind: MenuState.OPEN,
  },
];

export default function Page() {
  const [state, setState] = useState(MenuState.OPEN);
  
  // Convert past events to bet format when showing settled tab
  const settledBets = useMemo(() => {
    if (state !== MenuState.SETTLED) return [];
    
    const pastEvents = getPastEvents();
    
    return pastEvents.map(event => {
      // Determine win/lose based on the user's hypothetical position
      // In a real app, this would check the user's actual position
      const result = Math.random() > 0.5 ? "win" : "lose";
      
      // Access custom fields from past_events.json
      const pastEvent = event as any; // Type assertion since our Event type doesn't include these fields yet
      const resolvedDate = pastEvent.resolved_date ? new Date(pastEvent.resolved_date) : new Date();
      
      const bet: IBetv2 = {
        title: event.title,
        bet: pastEvent.winning_outcome ? String(pastEvent.winning_outcome) : "YES", 
        competition: event.category || "Unknown",
        date: resolvedDate,
        stake: Math.floor(Math.random() * 100) + 50, // Random stake between 50-150
        odds: pastEvent.final_odds ? 
               (typeof pastEvent.final_odds === 'object' ? 
                Number(Object.values(pastEvent.final_odds)[0]) * 100 : 
                event.probability) / 100 : 
               (event.probability || 50) / 100,
        potential: Math.floor(Math.random() * 300) + 100, // Random potential between 100-400
        kind: MenuState.SETTLED,
        result: result as "win" | "lose",
        eventId: event.id // Use the event ID for navigation
      };
      
      return bet;
    });
  }, [state]);

  return (
    <div className="mb-16">
      <Menu state={state} setState={setState} />
      <div className="bg-bb-bg-card-dark text-white mx-6">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col items-center gap-5 py-5">
            {state === MenuState.OPEN ? (
              bets
                .filter((bet) => bet.kind === state)
                .map((bet) => (
                  <Betv2
                    key={bet.eventId || hashBet({ date: bet.date, title: bet.title })}
                    {...bet}
                  />
                ))
            ) : (
              settledBets.length > 0 ? (
                settledBets.map((bet: IBetv2) => (
                  <Betv2
                    key={bet.eventId || hashBet({ date: bet.date, title: bet.title })}
                    {...bet}
                  />
                ))
              ) : (
                <div className="text-neutral-400 text-center p-4">
                  <p>No settled bets found</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
