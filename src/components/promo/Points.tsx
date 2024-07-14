"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  number: number;
  duration?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = (
  { number, duration = 2000 },
) => {
  const [value, setValue] = useState(0);
  const [color, setColor] = useState("text-gray-800");

  useEffect(() => {
    const start = performance.now();

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(progress * number));

      if (progress < 0.5) {
        setColor("text-neutral-400");
      } else {
        setColor("text-white");
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [number, duration]);

  return (
    <span className={`transition-colors duration-1000 ${color}`}>{value}</span>
  );
};

export default function Points() {
  return (
    <div className="flex overflow-x-scroll gap-3 no-scrollbar">
      <div className="max-w-[85rem] px-6 pt-10 pb-5 sm:px-6 mx-auto">
        <div className="grid items-center gap-6">
          <p className="text-6xl font-bold leading-10">
            <AnimatedNumber number={1255} />
            <span className="ms-1 inline-flex items-center gap-x-1 bg-gray-200 font-medium text-gray-800 text-xs leading-4 rounded-full py-0.5 px-2 dark:bg-neutral-800 dark:text-neutral-300">
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
              </svg>
              +7% this year
            </span>
          </p>
          <p className="mt-2 sm:mt-3 text-gray-500 dark:text-neutral-500">
            loyalty points earned since the beginning of the year
          </p>
          <div className="relative">
            <div className="grid gap-6 grid-cols-2 sm:gap-8">
              <div>
                <p className="text-3xl font-semibold">
                  <AnimatedNumber number={153} />
                </p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  points earned this month
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold">
                  <AnimatedNumber number={255} />
                </p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  $ worth of rewards redeemed
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold">
                  <AnimatedNumber number={25} />
                </p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  percentage global leaderboard ranking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
