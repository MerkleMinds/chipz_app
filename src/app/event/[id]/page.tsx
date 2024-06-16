"use client";
import Footer from "@/components/Footer";
import Accordion from "@/components/events/Accordion";
import HeadToHead from "@/components/events/HeadToHead";
import Goals from "@/components/events/Goals";
import Asian from "@/components/events/Asian";
import Banner from "@/components/events/Banner";

const goals = [
  {
    amount: 0.5,
    over: 1.5,
    under: 1.8,
  },
  {
    amount: 1.5,
    over: 1.6,
    under: 1.7,
  },
  {
    amount: 2.5,
    over: 2.4,
    under: 1.5,
  },
  {
    amount: 3.5,
    over: 3.5,
    under: 1.2,
  },
];

const asian = [
  {
    team: "Spain",
    choices: {
      left: {
        odds: 2.4,
        description: "+1",
      },
      middle: {
        odds: 3.3,
        description: "+1",
      },
      right: {
        odds: 2.5,
        description: "-1",
      },
    },
  },
  {
    team: "Italy",
    choices: {
      left: {
        odds: 3.9,
        description: "+1",
      },
      middle: {
        odds: 3.2,
        description: "+1",
      },
      right: {
        odds: 2.7,
        description: "-1",
      },
    },
  },
  {
    team: "Spain",
    choices: {
      left: {
        odds: 2.2,
        description: "+2",
      },
      middle: {
        odds: 4.4,
        description: "-2",
      },
      right: {
        odds: 9.5,
        description: "+2",
      },
    },
  },
  {
    team: "Italy",
    choices: {
      left: {
        odds: 8.4,
        description: "+2",
      },
      middle: {
        odds: 7.2,
        description: "-2",
      },
      right: {
        odds: 2.1,
        description: "+2",
      },
    },
  },
];

export default function Page(_params: { params: { id: string } }) {
  return (
    <main className="flex flex-col gap-5">
      <Banner
        home={{ name: "Spain", url: "/spain.png" }}
        away={{ name: "Italy", url: "/italy.png" }}
        date="20/06/2024"
        time="21:00"
      />
      <Accordion title="Head to Head">
        <HeadToHead
          home={{ name: "Spain", odds: "3.2" }}
          draw={{ odds: "1.9" }}
          away={{ name: "Italy", odds: "2.3" }}
        />
      </Accordion>
      <Accordion title="Main">
        {goals.map((goal, index) => (
          <Goals key={`${goal.under}-%${index}`} {...goal} />
        ))}
      </Accordion>
      <Accordion title="Asian Handicap">
        {asian.map((team, index) => (
          <Asian key={`${team.team}-%${index}`} {...team} />
        ))}
      </Accordion>
      <Footer />
    </main>
  );
}
