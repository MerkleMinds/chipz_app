"use client";

import React from 'react';
import Image from "next/image";
import { CiWallet } from "react-icons/ci";
import Link from "next/link";
import { useAppContext } from "@/components/Context";
import { useEffect } from "react";
import useGetAddress from "@/hooks/useGetAddress";
import useGetBalance from "@/hooks/useGetBalance";
import sections from "@/utils/data/sections";

const Icon = ({
  name,
  icon,
}: {
  name: string;
  icon: React.ReactElement;
}) => (
  <div className="flex items-center justify-center gap-1 flex-col min-w-10 max-w-10 text-neutral-400 hover:text-white transition-colors duration-300">
    {React.cloneElement(icon, { size: 24 })}
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
    <header className="w-full bg-bb-bg-card-dark shadow-lg">
      <div className="flex justify-between items-center px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center">
          <Image 
            src="/chipz_hor.png" 
            alt="Chipz" 
            width={100} 
            height={30} 
            priority 
          />
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/promo" className="flex items-center justify-center w-10 h-10 relative">
            <Image 
              src="/promo-icon-top.svg" 
              alt="Promo icon" 
              width={20} 
              height={20} 
              className="text-bb-accent"
            />
          </Link>
          {/* TODO: Add wallet connection 
          {address ? ( */}
            <div className="flex items-center gap-2">
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
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.path}
            className="mr-5"
          >
            <Icon name={section.name} icon={section.icon} />
          </Link>
        ))}
      </div>
    </header>
  );
}
