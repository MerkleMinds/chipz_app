"use client";

import { createContext, useContext, useState } from "react";

import { IBetSlipBet } from "@/components/BetSlip";
import schemas from "@/utils/schemas";
import { z } from "zod";

type NoUndefinedState<T> = T extends [
  infer S | undefined,
  React.Dispatch<React.SetStateAction<infer S | undefined>>,
] ? [S, React.Dispatch<React.SetStateAction<S>>]
  : never;

export type StateTuple<T> = NoUndefinedState<ReturnType<typeof useState<T>>>;

type Context = {
  bets: StateTuple<IBetSlipBet[]>;
  show: StateTuple<boolean>;
  amount: StateTuple<number>;
  user: StateTuple<z.infer<typeof schemas["user_create"]["response"]>>;
  points: StateTuple<number>;
};

function placeHolder<T>(value: T): StateTuple<T> {
  return [
    value,
    (arg) =>
      console.error(`Tried to set a value on a placeholder context`, { arg }),
  ];
}

const context = createContext<Context>({
  bets: placeHolder<IBetSlipBet[]>([]),
  show: placeHolder(false),
  amount: placeHolder(0),
  user: placeHolder({} as Context["user"][0]),
  points: placeHolder(0),
});

export function useAppContext() {
  return useContext(context);
}

type AppProps = {
  children: React.ReactNode;
};

export function AppContextProvider({ children }: AppProps) {
  const bets = useState<IBetSlipBet[]>([]);
  const show = useState<boolean>(false);
  const amount = useState<number>(0);
  const user = useState<Context["user"][0]>({} as Context["user"][0]);
  const points = useState<number>(800);

  return (
    <context.Provider
      value={{ bets, show, amount, user, points }}
    >
      {children}
    </context.Provider>
  );
}
