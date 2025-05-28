"use client";

import Banner from "@/components/profile/Banner";
import History from "@/components/profile/History";
// import Minipay from "@/components/profile/Minipay";
import Settings from "@/components/profile/Settings";
import Social from "@/components/profile/Social";
import { useAppContext } from "@/components/Context";
import useGetAddress from "@/hooks/useGetAddress";
import { useState } from "react";

const sections = {
//  minipay: Minipay,
  history: History,
  social: Social,
  settings: Settings,
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<keyof typeof sections>("history");
  const ActiveSection = sections[activeTab];
  const { points: [points] } = useAppContext();
  const address = useGetAddress();

  return (
    <>
      {address && (
        <div className="mx-6 mt-2 mb-4">
          <Banner
            name={`${address.slice(0, 6)}...${address.slice(0, 4)}`}
            points={points}
          />
        </div>
      )}
      <div className="bg-bb-bg-card-dark text-white mx-6 mt-2 mb-16">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between mb-4 gap-2">
            {(Object.keys(sections) as Array<keyof typeof sections>).map(
              (tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-2 transition-colors duration-300 ease-in-out rounded-md text-xs ${
                    activeTab === tab
                      ? "text-white bg-bb-bg-card"
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
    </>
  );
}
