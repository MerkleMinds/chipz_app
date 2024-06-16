import Accordion from "@/components/events/Accordion";
import Bet, { type IBet } from "@/components/bets/Bet";
import Checkout from "@/components/bets/Checkout";

const bets: IBet[] = [
  {
    name: "Euro 2024",
    chosen: "Spain",
    odds: 2.4,
    matchup: "Spain vs. Italy",
    kind: "Asian",
    description: "Spain to win +1 goal",
  },
  {
    name: "NBA Finals",
    chosen: "Milwaukee Bucks",
    odds: 1.3,
    matchup: "Milwaukee Bucks vs. Phoenix Suns",
    kind: "Main",
    description: "Bucks to win @ Half Time",
  },
  {
    name: "La Liga",
    chosen: "Over 2.5 goals",
    odds: 1.8,
    matchup: "Real Madrid vs. Granada C.F.",
    kind: "Goals",
    description: "Extra time & penalties not included",
  },
  {
    name: "Copa Libertadores",
    chosen: "Over 3.5 goals",
    odds: 2.5,
    matchup: "Boca Juniors vs. River Plate",
    kind: "Goals",
    description: "Extra time & penalties not included",
  },
];

export default function Page() {
  return (
    <main className="flex flex-col gap-5">
      <Checkout bets={bets} />
      {bets.map((bet) => (
        <Accordion title={bet.name} key={bet.name}>
          <Bet {...bet} />
        </Accordion>
      ))}
      <div className="mb-12"></div>
    </main>
  );
}
