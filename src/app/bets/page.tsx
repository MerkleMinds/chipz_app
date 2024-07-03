"use client";
import { useState } from "react";
import Menu, { MenuState } from "@/components/bets/Menu";
import Betv2, { type IBetv2 } from "@/components/bets/Betv2";

const bets: IBetv2[] = [
  {
    title: "Super Bowl LVIII",
    bet: "Chiefs to win",
    competition: "NFL",
    date: new Date("2024-02-11"),
    stake: 100,
    odds: 2.5,
    potential: 250,
    kind: MenuState.LIVE,
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
  },
  {
    title: "NBA Finals Game 7",
    bet: "Lakers to win",
    competition: "NBA",
    date: new Date("2024-06-18"),
    stake: 200,
    odds: 2.1,
    potential: 420,
    kind: MenuState.LIVE,
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
  const [state, setState] = useState(MenuState.LIVE);

  return (
    <div className="mb-16">
      <Menu state={state} setState={setState} />
      <div className="flex flex-col items-center gap-5 m-5">
        {bets
          .filter((bet) => bet.kind === state)
          .map((bet, index) => (
            <Betv2 key={index} {...bet} />
          ))}
      </div>
    </div>
  );
}
