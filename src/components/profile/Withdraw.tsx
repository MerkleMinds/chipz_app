"use client";

import AmountPopUp, {
  Methods,
  providerOptions,
} from "@/components/profile/Amount";
import { FaClock, FaCreditCard, FaLock, FaPaperPlane } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useTransaction, { Nullable } from "@/hooks/useTransaction";

import Image from "next/image";
import { useAppContext } from "@/components/Context";

export default function Withdraw() {
  const [banner, setBanner] = useState<Nullable<string>>();
  const [method, setMethod] = useState<Methods>();
  const [hide, setHide] = useState<boolean>(true);
  const [{ error, success }, dispatch] = useTransaction("cUSD", true);
  const [processed, setProcessed] = useState<boolean>(false);
  const { amount: [amount, setAmount] } = useAppContext();

  useEffect(() => {
    switch (true) {
      case success === null: {
        return;
      }
      case !success: {
        return;
      }
      case success: {
        if (!processed) {
          setBanner(`${amount} $ on the way to ${method}!`);
          setHide(true);
          setProcessed(true);
        }
        return;
      }
    }
  }, [amount, method, processed, success]);

  return (
    <>
      <div className="mb-6">
        {banner && (
          <div className="mb-4 w-full bg-gray-800 flex flex-row gap-2 border border-green-500 rounded-md p-2 items-center">
            <FaPaperPlane className="text-green-500" />
            <p className="text-green-500 text-xs">{banner}</p>
          </div>
        )}
        <h3 className="text-lg mb-4">Withdraw Options</h3>
        <div className="flex flex-row gap-2 mb-4 justify-center items-center">
          {providerOptions.map((option) => (
            <div
              className="rounded-lg bg-gray-800 flex items-center p-3 h-24 w-24 justify-center hover:bg-gray-700 cursor-pointer transition-colors duration-300 ease-in-out"
              key={option.name}
              onClick={() => {
                setMethod(option.name);
                setHide(false);
              }}
            >
              <Image
                width={500}
                height={500}
                src={option.logo}
                alt={option.name}
                className="w-16 h-auto"
              />
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="text-lg mb-4">Information</h3>
          <div className="bg-gray-800 p-4 flex flex-col rounded-md gap-2">
            <div className="flex items-center gap-2">
              <FaCreditCard className="text-neutral-400" />
              <div className="w-full flex flex-row justify-between items-center text-xs">
                <p className="text-neutral-400">Mimimum withdraw</p>
                <span>10 $</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaLock className="text-neutral-400" />
              <div className="w-full flex flex-row justify-between items-center text-xs">
                <p className="text-neutral-400">Maximum withdraw</p>
                <span>5000 $</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-neutral-400" />
              <div className="w-full flex flex-row justify-between items-center text-xs">
                <p className="text-neutral-400">Processing time</p>
                <span>1 - 3 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!hide && (
        <AmountPopUp
          error={error}
          callback={async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            dispatch("0x6E2D3e6a1D03f196f86311F773abC019Eb098fD9", amount);
          }}
          update={(n) => setAmount((o) => o - n)}
          hide={() => setHide(true)}
          text={{
            title: `Withdraw (${method})`,
            subtitle: "Enter the amount you want to withdraw",
            button: "Withdraw",
            minimum: "1 $",
            question: "Need help? Contact support",
          }}
        />
      )}
    </>
  );
}
