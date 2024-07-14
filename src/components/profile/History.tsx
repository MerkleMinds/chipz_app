import { FaArrowLeft, FaArrowRight, FaGear } from "react-icons/fa6";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

import { hashBet } from "@/components/bets/Betv2";

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

export default function History() {
  return (
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
              .reduce((acc, h) => acc + h.amount, 0)} $
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
              .reduce((acc, h) => acc + h.amount, 0)} $
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
                  .reduce((acc, h) => acc + h.amount, 0)} $
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
                <p className="text-sm">{entry.amount} $</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
