import { FaTimes } from "react-icons/fa";
import {
  FaScaleBalanced,
  FaUsers,
  FaChartLine,
  FaChevronUp,
} from "react-icons/fa6";

export interface IBet {
  name: string;
  chosen: string;
  odds: number;
  matchup: string;
  kind: "Asian" | "Goals" | "Main";
  description: string;
}

const kindToIcon: {
  [kind in IBet["kind"]]: (str: string) => JSX.Element;
} = {
  Asian: (str) => <FaScaleBalanced className={str} />,
  Goals: (str) => <FaChartLine className={str} />,
  Main: (str) => <FaUsers className={str} />,
};

export default function Bet(props: IBet) {
  const Icon = kindToIcon[props.kind]("w-6 h-6 text-neutral-400");

  return (
    <div className="max-w-[85rem] mb-2 mx-auto">
      <div className="grid md:grid-cols-4 rounded-xl overflow-hidden">
        <a className="block p-4 md:p-5 relative bg-gray-900" href="#">
          <div className="flex md:grid lg:flex gap-y-3 gap-x-5 flex-row items-center">
            <div className="flex items-center justify-center flex-col gap-2 max-w-10">
              {Icon}
              <p className="text-neutral-500">{props.kind}</p>
            </div>
            <div className="grow">
              <p className="text-xs uppercase tracking-wide font-medium text-neutral-400">
                {props.matchup}
              </p>
              <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white font-just">
                {props.chosen}
              </h3>
              <div className="mt-1 flex justify-between items-center">
                <p className="text-sm text-gray-500">{props.description}</p>
                <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-sm font-medium text-bb-success border-2 border-bb-success">
                  <FaChevronUp className="inline-block size-3 self-center" />
                  <span className="inline-block">{props.odds}</span>
                </span>
              </div>
            </div>
            <button className="absolute top-0 right-0 p-3 text-neutral-500">
              <FaTimes />
            </button>
          </div>
        </a>
      </div>
    </div>
  );
}
