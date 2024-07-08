import { FaCrown } from "react-icons/fa6";
import OneXTwo from "@/components/events/OneXTwo";

export default function Mainv2() {
  return (
    <div className="flex flex-col mx-3 gap-3 text-lg">
      <div className="flex flex-row gap-1 items-center">
        <FaCrown className="text-bb-accent inline-block" />
        <h1 className="text-white font-bold mx-1 font-just">
          Main
        </h1>
      </div>
      <div className="flex flex-col overflow-x-scroll gap-2 no-scrollbar ">
        <OneXTwo />
      </div>
    </div>
  );
}
