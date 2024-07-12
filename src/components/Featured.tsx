"use client";

import { FaCrown, FaFire, FaGear } from "react-icons/fa6";

import { type IMatchv2 } from "@/components/Live";
import { hashBet } from "@/components/bets/Betv2";
import { useAppContext } from "@/components/Context";

const featured: IMatchv2[] = [
  {
    competition: "NBA 2024",
    elapsed: 45,
    status: "Tomorrow, 19:00",
    kind: "Basketball",
    left: {
      team: "Utah Jazz",
      image:
        "https://cdn.inspireuplift.com/uploads/images/seller_products/1684740301_jazz4.png",
      score: 45,
    },
    right: {
      team: "GS Warriors",
      image:
        "https://www.pngall.com/wp-content/uploads/13/Golden-State-Warriors-Logo.png",
      score: 50,
    },
    odds: {
      left: {
        odds: 1.5,
        movement: 0.1,
      },
      draw: {
        odds: 2.5,
        movement: 0.1,
      },
      right: {
        odds: 3.5,
        movement: 0.1,
      },
    },
  },
  {
    competition: "NFL 2024",
    elapsed: 15,
    status: "1st quarter",
    kind: "1x2",
    left: {
      team: "Giants",
      image: "/giants.svg",
      score: 7,
    },
    right: {
      team: "Browns",
      image: "/browns.svg",
      score: 3,
    },
    odds: {
      left: {
        odds: 1.8,
        movement: 1,
      },
      draw: {
        odds: 3.2,
        movement: 1,
      },
      right: {
        odds: 2.8,
        movement: -1,
      },
    },
  },
];

const days = 1;
const hours = 12;
const minutes = 30;

function Card(props: IMatchv2) {
  const { bets: [, setBets], show: [, setShow] } = useAppContext();

  const addToBetSlip = (choice: "left" | "right" | "draw") => {
    const bet = {
      id: hashBet({
        date: new Date(),
        title: `${props.left.team} vs ${props.right.team}`,
      }),
      chosen: choice === "draw" ? "Draw" : props[choice].team,
      bet: "1x2",
      match: `${props.left.team} vs ${props.right.team}`,
      odds: props.odds[choice].odds,
    };
    setBets((bets) => [bet, ...bets]);
    setShow(true);
  };

  return (
    <div className="relative w-full shadow-md border border-neutral-700 flex-grow-0 flex-shrink-0 flex-auto rounded-xl bg-gray-800 flex items-center justify-between flex-col p-5 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <FaGear className="text-neutral-400" />
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-5">
        <div className="flex flex-row gap-2 items-center text-xl">
          <FaCrown className="text-bb-accent inline-block" />
          <p className="text-white">Top Match</p>
        </div>
        <div className="text-center mb-4">
          <p className="text-sm text-neutral-400">
            International • {props.competition}
          </p>
          <p className="text-xs text-neutral-400">{props.status}</p>
        </div>
        <div className="flex justify-between items-center w-full px-10 mb-4">
          <div
            onClick={() => addToBetSlip("left")}
            className="text-center flex flex-col items-center w-1/3 hover:bg-gray-700 hover:rounded-md transition-colors duration-300"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
              <img src={props.left.image} alt={props.left.team} />
            </div>
            <p className="font-bold text-white text-center break-words">
              {props.left.team}
            </p>
            <p className="text-neutral-400">{props.odds.left.odds}</p>
          </div>
          <div
            onClick={() => addToBetSlip("draw")}
            className="text-center w-1/3 hover:bg-gray-700 hover:rounded-md transition-colors duration-300"
          >
            <p className="font-bold text-xl text-white">X</p>
            <p className="text-neutral-400">{props.odds.draw.odds}</p>
          </div>
          <div
            onClick={() => addToBetSlip("right")}
            className="text-center flex flex-col items-center w-1/3 hover:bg-gray-700 hover:rounded-md transition-colors duration-300"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
              <img src={props.right.image} alt={props.right.team} />
            </div>
            <p className="font-bold text-white text-center break-words">
              {props.right.team}
            </p>
            <p className="text-neutral-400">{props.odds.right.odds}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-neutral-400">Event starts in:</p>
          <div className="flex flex-row items-center justify-center gap-3 text-lg">
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-white">{(days + "").padStart(2, "0")}</p>
              <p className="text-neutral-400 text-xs">
                DAY{days > 1 ? "S" : ""}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-white">{(hours + "").padStart(2, "0")}</p>
              <p className="text-neutral-400 text-xs">
                HOUR{hours > 1 ? "S" : ""}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-white">{(minutes + "").padStart(2, "0")}</p>
              <p className="text-neutral-400 text-xs">
                MIN{minutes > 1 ? "S" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Featured() {
  return (
    <div className="flex flex-col mx-3 gap-3 text-xs">
      <div className="flex flex-row gap-1 items-center">
        <FaFire className="text-bb-accent inline-block" />
        <h1 className="text-white font-bold mx-1 font-just text-sm">
          Featured
        </h1>
      </div>
      <div className="flex overflow-x-scroll gap-3 no-scrollbar">
        {featured.map((item, index) => <Card key={index} {...item} />)}
      </div>
    </div>
  );
}
