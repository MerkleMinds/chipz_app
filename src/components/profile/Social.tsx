import { FaClipboard, FaClipboardList, FaShare, FaUser } from "react-icons/fa6";

import { hashBet } from "@/components/bets/Betv2";

function ShareURL() {
  return (
    <div className="w-full rounded-md bg-gray-800 flex flex-col gap-2 p-2">
      <h1 className="text-sm font-bold">Share</h1>
      <div className="text-neutral-400 text-xs">
        <p>
          Invite your friends and you both get rewards when they sign up. Terms
          and conditions apply.
        </p>
      </div>
      <div className="w-full rounded-md flex items-center flex-row gap-2">
        <input
          type="text"
          className="w-full bg-gray-900 text-neutral-100 p-2 h-full rounded-md text-sm underline"
          value={`blockbet-staging.vercel.app/?ref=${
            hashBet({
              date: new Date("2024-01-31"),
              title: "Bet Title",
            })
          }`}
          readOnly
        />
        <button className="bg-gray-700 text-neutral-100 rounded-md p-2">
          <FaClipboard />
        </button>
      </div>
    </div>
  );
}

interface IFriendProps {
  name: string;
  points: number;
  joinedAt: Date;
}

function Friend({ name, points, joinedAt }: IFriendProps) {
  return (
    <div className="flex flex-row justify-between w-full rounded-md bg-gray-800 ">
      <div className="flex flex-row items-center p-2 gap-3">
        <div className="rounded-md bg-gray-900 h-full w-auto p-4">
          <FaUser className="text-neutral-400" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-white font-bold text-sm">{name}</h1>
          <p className="text-neutral-400 text-xs">
            {joinedAt.toLocaleDateString()} -{" "}
            <span className="font-bold">{points}</span> points
          </p>
        </div>
      </div>
      <div>
        <button className="text-neutral-400 rounded-md p-2 m-1 text-xs">
          <FaShare />
        </button>
      </div>
    </div>
  );
}

const friends: IFriendProps[] = [
  {
    name: "Dennis R.",
    points: 100,
    joinedAt: new Date(),
  },
  {
    name: "Kernighan B.",
    points: 200,
    joinedAt: new Date(),
  },
  {
    name: "Ritchie D.",
    points: 300,
    joinedAt: new Date(),
  },
  {
    name: "Thompson K.",
    points: 400,
    joinedAt: new Date(),
  },
  {
    name: "Pike R.",
    points: 500,
    joinedAt: new Date(),
  },
  {
    name: "Lovelace A.",
    points: 600,
    joinedAt: new Date(),
  },
];

export default function Social() {
  return (
    <div className="flex flex-col gap-5 pb-16">
      <div className="flex items-center">
        <ShareURL />
      </div>
      <div className="flex flex-row gap-1 items-center">
        <FaClipboardList className="text-bb-accent inline-block" />
        <h1 className="text-white font-bold mx-1 font-just text-sm">Friends</h1>
      </div>
      <div className="flex flex-col gap-2">
        {friends.map((friend, index) => (
          <Friend key={`social-${index}`} {...friend} />
        ))}
      </div>
    </div>
  );
}
