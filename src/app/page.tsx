import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { FaLandmark, FaFootball, FaPiggyBank, FaAnglesRight } from "react-icons/fa6";
import MarketBox from "@/components/components/Market";
import PredictionPreviewList from "@/components/components/PreviewBet";
import MarketTrend from "@/components/components/MarketTrend";
import MarketNbrBox from "@/components/components/MarketNbr";
// Import data service and types
import { getHomeData } from "@/utils/data/dataService";
import { CategoryData } from "@/utils/data/types";
import Link from "next/link";
import sections from "@/utils/data/sections";

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
                            <MarketTrend markets={[{
                                ...item,
                                // Ensure title is always a string for MarketTrend component
                                title: item.title || '',
                                // Ensure probability is always a number for MarketTrend component
                                probability: item.probability || 0,
                                // Ensure image is always a string for MarketTrend component
                                image: item.image || ''
                            }]} />
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

interface PageProps {
    icon: JSX.Element;
    title: string;
    items: CategoryData['items'];
}

const CompItem = ({ icon, title, items }: PageProps) => {
    // Find the section path for the "See more" link
    const sectionPath = sections.find(s => s.name.toLowerCase() === title.toLowerCase())?.path || '#';
    
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
                    <Link href={sectionPath}>See more</Link>
                    <FaAnglesRight />
                </div>
            </div>
            <HandleWhichComponent items={items} />
        </div>
    );
};

const getCategoryIcon = (title: string) => {
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



// Page is now an async component
export default async function Page() {
    // Get data from the data service
    const data = getHomeData();
    
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
