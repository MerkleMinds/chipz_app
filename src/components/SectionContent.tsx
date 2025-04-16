import { FaLandmark, FaFootball, FaPiggyBank, FaAnglesRight } from "react-icons/fa6";
import MarketBox, { type MarketItem } from "@/components/components/Market";
import PredictionPreviewList, { type PredictionPreviewItem } from "@/components/components/PreviewBet";
import MarketTrend, { type MarketTrendData } from "@/components/components/MarketTrend";
import MarketNbrBox, { type MarketNbrItem } from "@/components/components/MarketNbr";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export interface CategoryData {
    title: string;
    items: {
        trends?: MarketTrendData[];
        multiChoice?: MarketNbrItem[];
        previews?: {
            displayMode?: 'slider' | 'grid';
            data: PredictionPreviewItem[];
        };
        market?: MarketItem[];
    };
}

export interface SectionData {
    categories: CategoryData[];
}

const HandleWhichComponent = ({ items }: { items: CategoryData['items'] }) => {
    if (!items) return null;

    const renderSlider = (components: JSX.Element[]) => (
        components.length > 1 ? (
            <div className="overflow-x-auto flex gap-4 container-snap">
                {components}
            </div>
        ) : components[0]
    );

    const renderGrid = (components: JSX.Element[]) => (
        <>
            {components}
        </>
    );

    return (
        <>
            {items.trends && items.trends.length > 0 && 
                renderSlider(
                    items.trends.map((item, index) => (
                        <div key={index} className="flex grow">
                            <MarketTrend markets={[item]} />
                        </div>
                    ))
                )}
            
            {items.multiChoice && items.multiChoice.length > 0 && 
                renderSlider(
                    items.multiChoice.map((item, index) => (
                        <div key={index} className="flex grow">
                            <MarketNbrBox markets={[item]} />
                        </div>
                    ))
                )}
            
            {items.market && items.market.length > 0 && 
                renderSlider(
                    items.market.map((item, index) => (
                        <div key={index} className="flex grow">
                            <MarketBox markets={[item]} />
                        </div>
                    ))
                )}
            
            {items.previews && items.previews.data.length > 0 && (
                items.previews.displayMode === 'grid' ? 
                    renderGrid(
                        items.previews.data.map((item, index) => (
                            <div key={index} className="flex grow">
                                <PredictionPreviewList predictions={[item]} />
                            </div>
                        ))
                    ) :
                    renderSlider(
                        items.previews.data.map((item, index) => (
                            <div key={index} className="flex grow min-w-[300px]">
                                <PredictionPreviewList predictions={[item]} />
                            </div>
                        ))
                    )
            )}
        </>
    );
};

interface CompItemProps {
    icon: JSX.Element;
    title: string;
    items: CategoryData['items'];
}

const CompItem = ({ icon, title, items }: CompItemProps) => {
    return (
        <div className="flex flex-col mx-3 mt-2 gap-3 text-xs">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-1 items-center">
                    {icon}
                    <h1 className="text-white font-bold font-just text-sm">
                        {title}
                    </h1>
                </div>
                <div className="flex flex-row gap-1 items-center text-xs text-bb-accent">
                    <a href="#">See more</a>
                    <FaAnglesRight />
                </div>
            </div>
            <HandleWhichComponent items={items} />
        </div>
    );
};

export const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
        case 'sports':
            return <FaFootball className="text-bb-accent inline-block" />;
        case 'economy':
            return <FaPiggyBank className="text-bb-accent inline-block" />;
        case 'politics':
            return <FaLandmark className="text-bb-accent inline-block" />;
        default:
            return <FaLandmark className="text-bb-accent inline-block" />;
    }
};

export default function SectionContent({ data }: { data: SectionData }) {
    return (
        <main className="flex flex-col gap-y-5">
            {data.categories.map((category, index) => (
                <CompItem
                    key={index}
                    icon={getCategoryIcon(category.title)}
                    title={category.title}
                    items={category.items}
                />
            ))}
            <Partners />
            <Footer />
        </main>
    );
}
