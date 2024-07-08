"use client";

import Deposit from "@/components/profile/Deposit";
import History from "@/components/profile/History";
import Settings from "@/components/profile/Settings";
import Withdraw from "@/components/profile/Withdraw";
import { useState } from "react";

const sections = {
  deposit: Deposit,
  withdraw: Withdraw,
  history: History,
  settings: Settings,
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<keyof typeof sections>("deposit");
  const ActiveSection = sections[activeTab];

  return (
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
  );
}
