import { FaCreditCard, FaInfo, FaPiggyBank } from "react-icons/fa6";

import Link from "next/link";

interface IQuadProps {
  kind: "deposit" | "withdraw";
  color: string;
  href: string;
}

const Quad = ({ kind, color, href }: IQuadProps) => {
  return (
    <Link href={href} className="flex gap-3 flex-col">
      <div
        className={`rounded-md h-36 w-36 bg-${color} flex items-center flex-col gap-3 justify-center hover:bg-${color} cursor-pointer transition-colors duration-300 ease-in-out`}
      >
        {kind === "deposit"
          ? <FaCreditCard className="text-6xl text-white" />
          : <FaPiggyBank className="text-6xl text-white" />}
        <p className="text-neutral-400 text-sm">{kind}</p>
      </div>
    </Link>
  );
};

export default function Minipay() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center flex-row gap-3">
        <FaInfo className="text-neutral-400" />
        <p className="text-xs text-neutral-400">
          These links are from partners who offer the best exchange rates.
        </p>
      </div>
      <div className="flex flex-row gap-2 mb-4 justify-between items-center">
        <Quad kind="deposit" href="https://ramp.network/buy" color="gray-800" />
        <Quad
          kind="withdraw"
          href="https://ramp.network/sell"
          color="gray-800"
        />
      </div>
    </div>
  );
}
