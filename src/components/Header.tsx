"use client";

import {
  FaBolt,
  FaLandmark,
  FaFootball,
  FaBitcoin,
  FaAt,
  FaMagnifyingGlass,
  FaGift,
} from "react-icons/fa6";

import { CiWallet } from "react-icons/ci";

import { IoBriefcaseOutline } from "react-icons/io5";

import Link from "next/link";
import { useAppContext } from "@/components/Context";
import { useEffect } from "react";
import useGetAddress from "@/hooks/useGetAddress";
import useGetBalance from "@/hooks/useGetBalance";

const sports = [
  { name: "Live", icon: FaBolt }, // Could also use FaBroadcast
  { name: "Politics", icon: FaLandmark }, // Or FaScaleBalanced
  { name: "Sports", icon: FaFootball },
  { name: "Economy", icon: IoBriefcaseOutline }, // Or FaBriefcase
  { name: "Crypto", icon: FaBitcoin },
  { name: "Mentions", icon: FaAt },
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
  const {
    amount: [amount, setAmount],
  } = useAppContext();
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
      <div className="flex justify-between items-center px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center">
          <img src="/chipz_hor.png" alt="Chipz" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 relative">
            <FaGift className={`text-lg text-bb-accent w-5 h-5`} />
          </div>
          {/* TODO: Add wallet connection 
          {address ? ( */}
            <div className="flex items-center gap-3">
              <div className="w-[74px] h-[34px] rounded border border-white flex flex-row items-center justify-center">
                <CiWallet className={`text-lg text-white w-4 h-4`} />
                <span className="text-xs text-white font-semibold ml-2">
                  {amount.toFixed(2)} $
                </span>
              </div>
            </div>
          {/* ) : (
            <>Not Connected</>
          )} */}
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
