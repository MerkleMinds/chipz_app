"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaClock,
  FaCreditCard,
  FaEnvelope,
  FaExclamation,
  FaFutbol,
  FaGear,
  FaKey,
  FaLock,
  FaPaperPlane,
  FaQuestion,
  FaSpinner,
} from "react-icons/fa6";
import { SiGoogle, SiMeta, SiTwitch } from "react-icons/si";
import { hashBet } from "@/components/bets/Betv2";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { TbPlugConnected } from "react-icons/tb";
import useTransaction, { Nullable } from "@/hooks/useTransaction";
import { FaTimes } from "react-icons/fa";
import { context } from "@/components/Utils";
import { context as BetSlipContext } from "@/components/Utils";
import { IBetSlipBet } from "@/components/BetSlip";
import Bottom from "@/components/Bottom";
import Header from "@/components/Header";

const providerOptions = [
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

type Methods = Nullable<(typeof providerOptions)[number]["name"]>;

interface IAmountPopUpProps {
  error: Nullable<string>;
  disabled: () => boolean;
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

const AmountPopUp = ({
  error,
  disabled,
  callback,
  update,
  hide,
  text,
}: IAmountPopUpProps) => {
  const [loading, setLoading] = useState(false);

  const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      hide();
    }
  };

  return (
    <>
      <div
        className="w-full h-full bg-gray-900 bg-opacity-80 fixed top-0 left-0 flex justify-center items-center z-[152]"
        onClick={handleOuterClick}
      >
        <div className="relative w-full m-5 bg-gray-800 flex flex-col gap-5 p-5 rounded-md border-2 border-gray-700">
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
            onChange={(e) => update(+e.target.value)}
          />
          <button
            disabled={disabled() || loading}
            onClick={() => {
              setLoading(true);
              callback();
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
    </>
  );
};

const DepositSection = () => {
  const [{ error, success }, dispatch] = useTransaction("cUSD");
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<Methods>(null);
  const [hide, setHide] = useState<boolean>(true);
  const [banner, setBanner] = useState<Nullable<string>>();
  const [processed, setProcessed] = useState<boolean>(false);
  const { amount: old, setAmount: setOld } = useContext(context);

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
          setOld(old + amount);
          setProcessed(true);
        }
        return;
      }
    }
  }, [amount, method, old, setOld, success, processed]);

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
          disabled={() => amount <= 0}
          callback={async () => {
            dispatch("0xF5E8A439C599205C1aB06b535DE46681Aed1007a", amount);
          }}
          update={setAmount}
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
};

const WithdrawSection = () => {
  const [banner, setBanner] = useState<Nullable<string>>();
  const [method, setMethod] = useState<Methods>();
  const [amount, setAmount] = useState<number>(0);
  const [hide, setHide] = useState<boolean>(true);
  const [{ error, success }, dispatch] = useTransaction("cUSD", true); // TODO(jabolo): Send to user wallet
  const { amount: old, setAmount: setOld } = useContext(context);
  const [processed, setProcessed] = useState<boolean>(false);

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
          setBanner(`${amount} cUSD on the way to ${method}!`);
          setHide(true);
          setOld(old - amount);
          setProcessed(true);
        }
        return;
      }
    }
  }, [amount, method, old, processed, setOld, success]);

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
                <span>10 cUSD</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaLock className="text-neutral-400" />
              <div className="w-full flex flex-row justify-between items-center text-xs">
                <p className="text-neutral-400">Maximum withdraw</p>
                <span>5000 cUSD</span>
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
          disabled={() => amount <= 0}
          callback={async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            dispatch("0xF5E8A439C599205C1aB06b535DE46681Aed1007a", amount);
          }}
          update={setAmount}
          hide={() => setHide(true)}
          text={{
            title: `Withdraw (${method})`,
            subtitle: "Enter the amount you want to withdraw",
            button: "Withdraw",
            minimum: "1 cUSD",
            question: "Need help? Contact support",
          }}
        />
      )}
    </>
  );
};

interface IHistoryEntry {
  id: string;
  type: "deposit" | "withdraw";
  method: "mastercard" | "opera_minipay" | "apple_pay" | "google_pay";
  amount: number;
  date: string;
  time: string;
  state: "pending" | "processed";
}

function createHistoryEntries(count: number): IHistoryEntry[] {
  const generateEntry = (_: unknown, i: number): IHistoryEntry => {
    const date = new Date();
    const id = hashBet({ date: new Date(), title: `bet_${i}` });
    const type = Math.random() < 0.5 ? "deposit" : "withdraw";
    const amount = Math.floor(Math.random() * 500) + 50;
    const methodOptions = [
      "mastercard",
      "opera_minipay",
      "apple_pay",
      "google_pay",
    ] as const;
    const method =
      methodOptions[Math.floor(Math.random() * methodOptions.length)];
    const dateString = date.toISOString().split("T")[0];
    const timeString = `${date.getHours()}:${date.getMinutes()}`;

    return {
      id,
      type,
      method,
      amount,
      date: dateString,
      time: timeString,
      state: Math.random() < 0.3 ? "pending" : "processed",
    };
  };

  return Array.from({ length: count }, generateEntry).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

const history: IHistoryEntry[] = createHistoryEntries(20);

const HistorySection = () => (
  <div className="mb-6">
    <h3 className="text-lg mb-4">Transaction History</h3>
    <div className="bg-gray-800 p-4 flex flex-col rounded-md gap-2 mb-4">
      <div className="w-full flex justify-between items-center">
        <p className="text-sm">Last 30 days</p>
        <FaGear className="text-neutral-400" />
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-gray-900 p-1 rounded-md">
            <FaArrowRight className="text-neutral-400" />
          </div>
          <p className="text-neutral-400 text-sm">Total Deposits</p>
        </div>
        <p>
          {history
            .filter((h) => h.type === "deposit")
            .reduce((acc, h) => acc + h.amount, 0)} cUSD
        </p>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-gray-900 p-1 rounded-md">
            <FaArrowLeft className="text-green-500" />
          </div>
          <p className="text-neutral-400 text-sm">Total Withdrawals</p>
        </div>
        <p>
          {history
            .filter((h) => h.type === "withdraw")
            .reduce((acc, h) => acc + h.amount, 0)} cUSD
        </p>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-neutral-400 text-sm">Total Net Deposits</p>
        </div>
        <div className="flex flex-row gap-2">
          {history
              .filter((h) => h.type === "deposit")
              .reduce((acc, h) => acc + h.amount, 0) >
              history
                .filter((h) => h.type === "withdraw")
                .reduce((acc, h) => acc + h.amount, 0)
            ? (
              <div className="bg-gray-900 p-1 rounded-md">
                <GoTriangleDown className="text-red-500" />
              </div>
            )
            : (
              <div className="bg-gray-900 p-1 rounded-md">
                <GoTriangleUp className="text-green-500" />
              </div>
            )}
          <p>
            {history
              .filter((h) => h.type === "withdraw")
              .reduce((acc, h) => acc + h.amount, 0) -
              history
                .filter((h) => h.type === "deposit")
                .reduce((acc, h) => acc + h.amount, 0)} cUSD
          </p>
        </div>
      </div>
    </div>
    <h3 className="text-lg mb-4">Detailed Overview</h3>
    <div className="mb-16 flex flex-col gap-2">
      {history.map((entry) => (
        <div
          className="w-full bg-gray-800 rounded-md p-2 flex items-center justify-between"
          key={entry.id}
        >
          <div className="flex flex-row items-center gap-2">
            <div className="bg-gray-900 p-1 rounded-md">
              {entry.type === "deposit"
                ? <FaArrowRight className="text-neutral-400" />
                : <FaArrowLeft className="text-green-500" />}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-neutral-400">
                <span className="font-mono">{entry.time}</span> | {entry.type}
              </p>
              <p className="text-sm text-neutral-400">
                {entry.method
                  .split("_")
                  .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
                  .join(" ")}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center mx-2">
            <div className="flex flex-col gap-2 items-end">
              <p
                className={`text-sm ${
                  entry.state === "processed"
                    ? "text-green-500"
                    : "text-neutral-400"
                }`}
              >
                {entry.state}
              </p>
              <p className="text-sm">{entry.amount} cUSD</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SettingsSection = () => (
  <>
    <div className="mb-6">
      <h3 className="text-lg mb-4">Credentials</h3>
      <div className="flex flex-col gap-1 items-center mb-2">
        <div className="flex items-center w-full">
          <FaEnvelope className="mr-2" />
          <span>Email</span>
        </div>
        <div className="flex items-center w-full">
          <input
            type="email"
            className="bg-gray-800 rounded px-3 py-2 text-neutral-400 w-full"
            placeholder="Current email"
            disabled
          />
          <FaLock className="ml-2" />
        </div>
      </div>

      <div className="flex flex-col gap-1 items-center mb-2">
        <div className="flex items-center w-full">
          <FaKey className="mr-2" />
          <span>Password</span>
        </div>
        <div className="flex items-center w-full">
          <input
            type="password"
            className="bg-gray-800 rounded px-3 py-2 text-neutral-400 w-full"
            placeholder="Current password"
            disabled
          />
          <FaLock className="ml-2" />
        </div>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-lg mb-4">Get started</h3>
      <ul>
        <li className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <span>Verify your email</span>
          </div>
          <FaCheck className="text-green-500" />
        </li>
        <li className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaCreditCard className="mr-2" />
            <span>Deposit</span>
          </div>
          <FaCheck className="text-green-500" />
        </li>
        <li className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaFutbol className="mr-2" />
            <span>Place a bet</span>
          </div>
          <FaCheck className="text-green-500" />
        </li>
      </ul>
    </div>
    <div>
      <h3 className="text-lg mb-4">Link account</h3>
      <div className="flex flex-col space-y-2">
        <button className="flex items-center justify-between bg-gray-800 p-3 rounded">
          <div className="flex items-center">
            <SiGoogle className="mr-2" />
            <span>Google</span>
          </div>
          <TbPlugConnected className="text-neutral-400" />
        </button>
        <button className="flex items-center justify-between bg-gray-800 p-3 rounded">
          <div className="flex items-center">
            <SiMeta className="mr-2" />
            <span>Meta</span>
          </div>
          <TbPlugConnected className="text-neutral-400" />
        </button>
        <button className="flex items-center justify-between bg-gray-800 p-3 rounded">
          <div className="flex items-center">
            <SiTwitch className="mr-2" />
            <span>Twitch</span>
          </div>
          <TbPlugConnected className="text-neutral-400" />
        </button>
      </div>
    </div>
  </>
);

const sections = {
  deposit: DepositSection,
  withdraw: WithdrawSection,
  history: HistorySection,
  settings: SettingsSection,
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<keyof typeof sections>("deposit");
  const [bets, setBets] = useState<IBetSlipBet[]>([]);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(25.4);

  const ActiveSection = sections[activeTab];

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
      <div className="bg-gray-900 text-white mx-6 mt-2 mb-16">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between mb-6 gap-2">
            {(Object.keys(sections) as Array<keyof typeof sections>).map(
              (tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-2 transition-colors duration-300 ease-in-out rounded-md text-xs ${
                    activeTab === tab
                      ? "text-white bg-gray-800"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ),
            )}
          </div>

          <ActiveSection />
        </div>
      </div>
      <Bottom />
    </BetSlipContext.Provider>
  );
}
