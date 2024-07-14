"use client";

import { FaExclamation, FaQuestion, FaSpinner } from "react-icons/fa6";

import { FaTimes } from "react-icons/fa";
import { Nullable } from "@/hooks/useTransaction";
import { useState } from "react";

export const providerOptions = [
  {
    name: "Mastercard",
    logo: "/mastercard.png",
  },
  {
    name: "Opera Minipay",
    logo: "/opera_mini.png",
  },
  {
    name: "Apple Pay",
    logo: "/apple_pay_v2.svg",
  },
  {
    name: "Google Pay",
    logo: "/google_pay_v3.png",
  },
];

export type Methods = Nullable<(typeof providerOptions)[number]["name"]>;

interface IAmountPopUpProps {
  error: Nullable<string>;
  callback: () => void;
  update: (amount: number) => void;
  hide: () => void;
  text: {
    title: string;
    subtitle: string;
    button: string;
    minimum: string;
    question: string;
  };
}

export default function AmountPopUp({
  error,
  callback,
  update,
  hide,
  text,
}: IAmountPopUpProps) {
  const [value, setValue] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      hide();
    }
  };

  return (
    <div
      className="w-full h-full bg-gray-900 bg-opacity-80 fixed top-0 left-0 flex justify-center items-center z-[152]"
      onClick={handleOuterClick}
    >
      <div className="relative mx-auto w-[24rem] m-5 bg-gray-800 flex flex-col gap-5 p-5 rounded-md border-2 border-gray-700">
        <button
          onClick={hide}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          <FaTimes size={20} />
        </button>
        <h3 className="text-lg">{text.title}</h3>
        <p className="text-neutral-400 text-xs">{text.subtitle}</p>
        <input
          type="number"
          placeholder="1.00 cUSD"
          className="p-4 w-full bg-gray-900 rounded-md"
          onChange={(e) => setValue(+e.target.value)}
        />
        <button
          disabled={value <= 0 || loading}
          onClick={() => {
            setLoading(true);
            callback();
            update(value);
          }}
          className="w-full rounded-md bg-bb-accent p-3 disabled:opacity-50 flex items-center justify-center"
        >
          {loading && <FaSpinner className="animate-spin mr-2" />}
          {text.button}
        </button>
        <div className="flex flex-row gap-2 items-center text-xs">
          {!error
            ? (
              <>
                <FaQuestion className="text-neutral-400" />
                <p className="text-neutral-400">{text.question}</p>
              </>
            )
            : (
              <>
                <FaExclamation className="text-red-500" />
                <p className="text-red-500 text-xs">
                  Unexpected error happened
                </p>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
