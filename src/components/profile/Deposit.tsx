"use client";

import AmountPopUp, { Methods } from "@/components/profile/Amount";
import { FaClock, FaCreditCard, FaLock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useTransaction, { Nullable } from "@/hooks/useTransaction";

import Image from "next/image";
import { useAppContext } from "@/components/Context";

export default function Deposit() {
  const [{ error, success }, dispatch] = useTransaction("cUSD");
  const [method, setMethod] = useState<Methods>(null);
  const [hide, setHide] = useState<boolean>(true);
  const [banner, setBanner] = useState<Nullable<string>>();
  const [processed, setProcessed] = useState<boolean>(false);
  const { amount: [amount, setAmount] } = useAppContext();

  useEffect(() => {
    switch (true) {
      case success === null: {
        setProcessed(false);
        return;
      }
      case !success: {
        return;
      }
      case success: {
        if (!processed) {
          setBanner(`Deposited ${amount} cUSD via ${method}!`);
          setHide(true);
          setProcessed(true);
        }
        return;
      }
    }
  }, [amount, method, success, processed]);

  return (
    <>
      <div className="mb-6">
        {banner && (
          <div className="mb-4 w-full bg-gray-800 flex flex-row gap-2 border border-green-500 rounded-md p-2 items-center">
            <FaCreditCard className="text-green-500" />
            <p className="text-green-500 text-xs">{banner}</p>
          </div>
        )}
        <h3 className="text-lg mb-4">Popular</h3>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="bg-gray-800 p-4 flex flex-col items-center rounded-md"
            onClick={() => {
              setMethod("Opera Minipay");
              setHide(false);
            }}
          >
            <Image
              width={100}
              height={100}
              src="/opera_mini.png"
              alt="Opera Mini"
              className="mb-2 w-auto h-20"
            />
            <span className="text-xs">Opera Minipay</span>
          </div>
          <div
            className="bg-gray-800 p-4 flex flex-col items-center rounded-md"
            onClick={() => {
              setMethod("Mastercard");
              setHide(false);
            }}
          >
            <Image
              width={100}
              height={100}
              src="/mastercard.png"
              alt="Visa"
              className="mb-2 w-auto h-20"
            />
            <span className="text-xs">Credit & Debit</span>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg mb-4">One tap</h3>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="bg-gray-800 p-4 flex flex-col items-center rounded-md"
            onClick={() => {
              setMethod("Apple Pay");
              setHide(false);
            }}
          >
            <Image
              width={100}
              height={100}
              src="/apple_pay_v2.svg"
              alt="Apple pay"
              className="mb-2 w-auto h-20"
            />
            <span className="text-xs">Apple Pay</span>
          </div>
          <div
            className="bg-gray-800 p-4 flex flex-col items-center rounded-md"
            onClick={() => {
              setMethod("Google Pay");
              setHide(false);
            }}
          >
            <Image
              width={100}
              height={100}
              src="/google_pay_v3.png"
              alt="Visa"
              className="mb-2 w-auto h-20"
            />
            <span className="text-xs">Google Pay</span>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg mb-4">Information</h3>
        <div className="bg-gray-800 p-4 flex flex-col rounded-md gap-2">
          <div className="flex items-center gap-2">
            <FaCreditCard className="text-neutral-400" />
            <div className="w-full flex flex-row justify-between items-center text-xs">
              <p className="text-neutral-400">Mimimum deposit</p>
              <span>10 cUSD</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaLock className="text-neutral-400" />
            <div className="w-full flex flex-row justify-between items-center text-xs">
              <p className="text-neutral-400">Maximum deposit</p>
              <span>6000 cUSD</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-neutral-400" />
            <div className="w-full flex flex-row justify-between items-center text-xs">
              <p className="text-neutral-400">Processing time</p>
              <span>Instant</span>
            </div>
          </div>
        </div>
      </div>
      {!hide && (
        <AmountPopUp
          error={error}
          callback={async () => {
            dispatch("0xF5E8A439C599205C1aB06b535DE46681Aed1007a", amount);
          }}
          update={(n) => setAmount((o) => o + n)}
          hide={() => setHide(true)}
          text={{
            title: `Deposit (${method})`,
            subtitle: "Enter the amount you want to deposit",
            button: "Deposit",
            minimum: "1 cUSD",
            question: "Need help? Contact support",
          }}
        />
      )}
    </>
  );
}
