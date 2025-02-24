import Footer from "@/components/Footer";
import Partners from "@/components/Partners";

import { FaLandmark, FaFootball, FaPiggyBank, FaAnglesRight } from "react-icons/fa6";
import MarketBox, { type MarketItem } from "@/components/components/Market";
import PredictionPreviewList, { type PredictionPreviewItem } from "@/components/components/PreviewBet";

import data from "@/utils/data/home.json" with { type: "json" };
import MarketTrend from "@/components/components/MarketTrend";
import MarketNbrBox, { MarketNbrItem } from "@/components/components/MarketNbr";

interface PageProps {
    icon: JSX.Element;
    logo: JSX.Element;
    MarketComponent: JSX.Element;
}



const CompItem = ({ icon, logo, MarketComponent }: PageProps) => {
    return (
        <div className="flex flex-col mx-3 mt-2 gap-3 text-xs">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-1 items-center">
                    {icon}
                    <h1 className="text-white font-bold font-just text-sm">
                        {logo}
                    </h1>
                </div>
                <div className="flex flex-row gap-1 items-center text-xs text-bb-accent">
                    <a href="#">See more</a>
                    <FaAnglesRight />
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
                MarketComponent={<MarketTrend markets={data.politics} />}
            />

            <CompItem
                icon={<FaFootball className="text-bb-accent inline-block" />}
                logo={<h1 className="text-white font-bold mx-1 font-just text-sm">Sports</h1>}
                MarketComponent={
                    <MarketNbrBox markets={data.sports as MarketNbrItem[]} />
                }
            />
            <CompItem
                icon={<FaPiggyBank className="text-bb-accent inline-block" />}
                logo={<h1 className="text-white font-bold mx-1 font-just text-sm">Economy</h1>}
                MarketComponent={
                    <MarketNbrBox markets={data.economy as MarketNbrItem[]} />

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
