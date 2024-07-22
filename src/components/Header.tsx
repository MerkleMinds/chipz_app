"use client";

import {
  FaBaseballBatBall,
  FaBitcoinSign,
  FaBolt,
  FaCalendarDay,
  FaFootball,
  FaFutbol,
  FaGift,
  FaGolfBallTee,
  FaMagnifyingGlass,
  FaTableTennisPaddleBall,
  FaTrophy,
  FaUser,
} from "react-icons/fa6";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useAppContext } from "@/components/Context";
import useGetBalance from "@/hooks/useGetBalance";
import { MdOutlineOpenInNew } from "react-icons/md";
import useGetAddress from "@/hooks/useGetAddress";

const sports = [
  { name: "Live", icon: FaBolt },
  { name: "Today", icon: FaCalendarDay },
  { name: "Lossless", icon: FaBitcoinSign },
  { name: "Promo", icon: FaGift },
  { name: "NFL", icon: FaFootball },
  { name: "Soccer", icon: FaFutbol },
  { name: "Baseball", icon: FaBaseballBatBall },
  { name: "Tennis", icon: FaTableTennisPaddleBall },
  { name: "Golf", icon: FaGolfBallTee },
  { name: "Euros", icon: FaTrophy },
  { name: "Search", icon: FaMagnifyingGlass },
];

const Icon = ({
  name,
  icon: IconComponent,
}: {
  name: string;
  icon: React.ComponentType<{ size: number }>;
}) => (
  <div className="flex items-center justify-center gap-1 flex-col min-w-10 max-w-10 text-neutral-400 hover:text-white transition-colors duration-300">
    <IconComponent size={24} />
    <span className="text-xs">{name}</span>
  </div>
);

export default function Header() {
  const { amount: [amount, setAmount] } = useAppContext();
  const address = useGetAddress();
  const [balance, getBalance] = useGetBalance();

  useEffect(() => {
    if (address) {
      getBalance(address);
    }
  }, [address, getBalance]);

  useEffect(() => {
    setAmount(balance);
  }, [balance, setAmount]);

  return (
    <header className="w-full bg-gray-900 shadow-lg">
      <div className="flex justify-between items-center px-4 py-2 pt-4 md:px-4">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="BlockBet" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-2">
          {address
            ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 border-bb-accent text-bb-accent"
                >
                  Deposit
                </Link>
                <div className="flex items-center gap-2 flex-col">
                  <FaUser className="h-4 text-neutral-400" />
                  <span className="text-xs text-white font-semibold">
                    {amount.toFixed(2)} $
                  </span>
                </div>
              </div>
            )
            : (
              <>
                <div className="flex items-center gap-3">
                  <Link
                    href="https://www.opera.com/es/products/minipay"
                    className="relative py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 border-neutral-400 text-neutral-400"
                  >
                    MiniPay

                    <MdOutlineOpenInNew className="h-4 text-neutral-400" />
                  </Link>
                </div>
              </>
            )}
        </div>
      </div>
      <div className="flex overflow-x-auto no-scrollbar p-4">
        {sports.map((sport) => (
          <Link
            key={sport.name}
            href={`/${sport.name.toLowerCase()}`}
            className="mr-5"
          >
            <Icon {...sport} />
          </Link>
        ))}
      </div>
    </header>
  );
}
