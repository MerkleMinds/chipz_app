import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface IHistoryEntry {
  type: "deposit" | "withdraw";
  amount: number;
}

interface BalanceOverviewProps {
  history: IHistoryEntry[];
  period?: string;
}

export default function BalanceOverview({ history, period = "Last 30 days" }: BalanceOverviewProps) {
  const totalRevenue = history
    .filter((h) => h.type === "deposit")
    .reduce((acc, h) => acc + h.amount, 0);

  const totalLoss = history
    .filter((h) => h.type === "withdraw")
    .reduce((acc, h) => acc + h.amount, 0);

  return (
    <div className="bg-gray-800 p-4 flex flex-col rounded-md gap-2 mb-4">
      <div className="w-full flex justify-between items-center">
        <p className="text-sm">{period}</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-gray-900 p-1 rounded-md">
            <IoIosArrowUp className="text-[#23C45E]" />
          </div>
          <p className="text-neutral-400 text-sm">Total Revenue</p>
        </div>
        <p>{totalRevenue} $</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-gray-900 p-1 rounded-md">
            <IoIosArrowDown className="text-[#EF4444]" />
          </div>
          <p className="text-neutral-400 text-sm">Total Loss</p>
        </div>
        <p>{totalLoss} $</p>
      </div>
    </div>
  );
}
