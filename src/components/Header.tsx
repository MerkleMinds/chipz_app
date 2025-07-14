"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { CiWallet } from "react-icons/ci";
import Link from "next/link";
import { useAppContext } from "@/components/Context";
import { useEffect } from "react";
import useGetAddress from "@/hooks/useGetAddress";
import useGetBalance from "@/hooks/useGetBalance";
import sections, { getCategoryIcon } from "@/utils/data/sections";

const Icon = ({
  name,
}: {
  name: string;
}) => (
  <div className="flex items-center justify-center gap-1 flex-col min-w-10 max-w-10 text-neutral-400 hover:text-white transition-colors duration-300">
    {getCategoryIcon(name, '', 24)}
    <span className="text-xs">{name}</span>
  </div>
);

export default function Header() {
  const {
    amount: [amount, setAmount],
  } = useAppContext();
  const { address, connectWallet, isConnecting } = useGetAddress();
  const [balance, getBalance] = useGetBalance();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (address) {
      getBalance(address);
    } else {
      // Show warning popup if no address is found after initial load
      const timer = setTimeout(() => {
        setShowWarning(true);
      }, 1500); // Delay to allow for auto-connection attempts
      
      return () => clearTimeout(timer);
    }
  }, [address, getBalance]);

  useEffect(() => {
    setAmount(balance);
    console.log("balance", balance);
  }, [balance, setAmount]);

  console.log("address", address);

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
          <div className="flex items-center gap-2">
            {address ? (
              <div className="w-[74px] h-[34px] rounded border border-white flex flex-row items-center justify-center">
                <CiWallet className={`text-lg text-white w-4 h-4`} />
                <span className="text-xs text-white font-semibold ml-2">
                  {amount.toFixed(2)} $
                </span>
              </div>
            ) : (
              <button 
                onClick={() => {
                  connectWallet();
                  setShowWarning(false);
                }} 
                disabled={isConnecting}
                className="w-[74px] h-[34px] rounded border border-white flex flex-row items-center justify-center bg-transparent hover:bg-white/10 transition-colors duration-300 disabled:opacity-70"
              >
                <CiWallet className={`text-lg text-white w-4 h-4`} />
                <span className="text-xs text-white font-semibold ml-2">
                  {isConnecting ? "..." : "Connect"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Warning Popup */}
      {showWarning && !address && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-bb-bg-card-dark border border-white/20 rounded-lg p-5 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-white font-bold text-lg mb-3">Wallet Connection Required</h3>
            <p className="text-neutral-300 mb-4">
              No wallet connection found. Please connect your MiniPay wallet to continue using all features.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowWarning(false)} 
                className="px-4 py-2 text-white border border-white/30 rounded hover:bg-white/10 transition-colors"
              >
                Later
              </button>
              <button 
                onClick={() => {
                  connectWallet();
                  setShowWarning(false);
                }} 
                className="px-4 py-2 bg-white text-black rounded font-medium hover:bg-gray-200 transition-colors"
              >
                Connect Now
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex overflow-x-auto no-scrollbar p-4">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.path}
            className="mr-5"
          >
            <Icon name={section.name} />
          </Link>
        ))}
      </div>
    </header>
  );
}
