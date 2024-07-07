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
import Bottom from "@/components/Bottom";
import Header from "@/components/Header";

export default function Home() {
  const [show, setShow] = useState(false);
  const [bets, setBets] = useState<IBetSlipBet[]>([]);
  const [amount, setAmount] = useState(0);

  return (
    <BetSlipContext.Provider
      value={{
        bets,
        setBets,
        show,
        setShow,
        amount,
        setAmount,
      }}
    >
      <Header />
      <main className="flex flex-col gap-5">
        <League />
        <Featured />
        <Live />
        <HeadToHead />
        <Partners />
        <Footer />
      </main>
      <Bottom />
      <Betslip />
    </BetSlipContext.Provider>
  );
}
