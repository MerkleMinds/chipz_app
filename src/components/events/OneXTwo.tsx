"use client";

import { FaCircleInfo } from "react-icons/fa6";
import { useState } from "react";

export default function OneXTwo() {
  const [selected, setSelected] = useState<"regular" | "first" | "second">(
    "regular",
  );

  return (
    <div className="bg-gray-800 rounded-md flex flex-col justify-center border border-gray-700">
      <div className="flex justify-between p-2 text-xs bg-gray-700 rounded-md">
        <p className="text-neutral-400">Match result</p>
        <FaCircleInfo className="text-neutral-400" />
      </div>
      <div>
        <div className="flex flex-row text-sm p-2 gap-2">
          <p
            className={`bg-gray-800 p-2 rounded-md ${
              selected === "regular" ? "text-white" : "text-neutral-400"
            }`}
            onClick={() => setSelected("regular")}
          >
            Regular time
          </p>
          <p
            className={`bg-gray-800 p-2 rounded-md ${
              selected === "first" ? "text-white" : "text-neutral-400"
            }`}
            onClick={() => setSelected("first")}
          >
            1st Half
          </p>
          <p
            className={`bg-gray-800 p-2 rounded-md ${
              selected === "second" ? "text-white" : "text-neutral-400"
            }`}
            onClick={() => setSelected("second")}
          >
            2nd Half
          </p>
        </div>
        {/* TODO: Come up with design */}
      </div>
    </div>
  );
}
