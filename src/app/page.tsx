"use client";
import HeadToHead from "@/components/HeadToHead";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import League from "@/components/League";
import Live from "@/components/Live";
import Featured from "@/components/Featured";
import { context as BetSlipContext } from "@/components/Utils";
import { useState } from "react";
import Betslip, { IBetSlipBet } from "@/components/BetSlip";

export default function Home() {
  const [show, setShow] = useState(false);
  const [bets, setBets] = useState<IBetSlipBet[]>([]);

  return (
    <BetSlipContext.Provider
      value={{
        bets,
        setBets,
        show,
        setShow,
      }}
    >
      <main className="flex flex-col gap-5">
        <League />
        <Featured />
        <Live />
        <HeadToHead />
        <Partners />
        <Footer />
      </main>
      <Betslip />
    </BetSlipContext.Provider>
  );
}
