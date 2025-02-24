import Footer from "@/components/Footer";
import Partners from "@/components/Partners";

import { FaLandmark, FaFootball, FaPiggyBank } from "react-icons/fa6";
import { CiSquareMore } from "react-icons/ci";
import MarketBox, { type MarketItem } from "@/components/components/Market";
import PredictionPreviewList, { type PredictionPreviewItem } from "@/components/components/PreviewBet";

import data from "@/utils/data/home.json" with { type: "json" };

interface PageProps {
    icon: JSX.Element;
    logo: JSX.Element;
    MarketComponent: JSX.Element;
}

const CompItem = ({ icon, logo, MarketComponent }: PageProps) => {
    return (
        <div className="flex flex-col mx-3 mt-3 gap-3 text-xs">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-1 items-center">
                    {icon}
                    <h1 className="text-white font-bold mx-1 font-just text-sm">
                        {logo}
                    </h1>
                </div>
                <div className="flex items-center">
                    <CiSquareMore className="text-white" />
                </div>
            </div>
            {MarketComponent}
        </div>
    );
}

export default function Page() {
    return (
        <main className="flex flex-col gap-5">
            <CompItem
                icon={<FaLandmark className="text-bb-accent inline-block" />}
                logo={<h1 className="text-white font-bold mx-1 font-just text-sm">Politics</h1>}
                MarketComponent={<MarketBox markets={data.politics as MarketItem[]} />}
            />
            <CompItem
                icon={<FaFootball className="text-bb-accent inline-block" />}
                logo={<h1 className="text-white font-bold mx-1 font-just text-sm">Sports</h1>}
                MarketComponent={
                    <div className="flex overflow-x-scroll gap-3 no-scrollbar">
                        {data.sports.map((item, index) => (
                            <div key={item.id || index} className="flex flex-auto flex-grow-0 flex-shrink-0 w-[75%]">
                                <MarketBox key={index} markets={[item] as MarketItem[]} />
                            </div>
                        ))}
                    </div>
                }
            />
            <CompItem
                icon={<FaPiggyBank className="text-bb-accent inline-block" />}
                logo={<h1 className="text-white font-bold mx-1 font-just text-sm">Economy</h1>}
                MarketComponent={
                    <div className="flex overflow-x-scroll gap-3 no-scrollbar">
                        {data.economy.map((item, index) => (
                            <div key={item.id || index} className="flex flex-auto flex-grow-0 flex-shrink-0 w-[75%]">
                                <MarketBox key={index} markets={[item] as MarketItem[]} />
                            </div>
                        ))}
                    </div>
                }
            />
            <div className="flex flex-col mx-3 gap-3 text-xs">
                <PredictionPreviewList predictions={data.economypreview as PredictionPreviewItem[]} />
            </div>
            <Partners />
            <Footer />
        </main>
    );
}
