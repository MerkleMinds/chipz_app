import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { FaLandmark, FaFootball, FaPiggyBank, FaAnglesRight } from "react-icons/fa6";
import MarketBox, { type MarketItem } from "@/components/components/Market";
import PredictionPreviewList, { type PredictionPreviewItem } from "@/components/components/PreviewBet";
import rawData from "@/utils/data/home.json" with { type: "json" };
import MarketTrend, { type MarketTrendData } from "@/components/components/MarketTrend";
import MarketNbrBox, { type MarketNbrItem } from "@/components/components/MarketNbr";

interface HomeData {
    categories: CategoryData[];
}

const data = rawData as HomeData;

type CategoryItemUnion = (MarketTrendData & { type: 'trend' }) | 
                        (MarketNbrItem & { type: 'number' }) | 
                        (MarketItem & { type: 'market' }) |
                        (PredictionPreviewItem & { type: 'preview' });

interface CategoryData {
    title: string;
    data: CategoryItemUnion[];
}

interface PageProps {
    icon: JSX.Element;
    title: string;
    data: CategoryItemUnion[];
}

const HandleWhichComponent = ({ data }: { data: CategoryItemUnion[] }) => {
    if (!data || data.length === 0) return null;

    return (
        <>
            {data.filter(item => item.type === 'trend').length > 0 && 
                <MarketTrend markets={data.filter(item => item.type === 'trend') as MarketTrendData[]} />}
            
            {data.filter(item => item.type === 'number').length > 0 && 
                <MarketNbrBox markets={data.filter(item => item.type === 'number') as MarketNbrItem[]} />}
            
            {data.filter(item => item.type === 'market').length > 0 && 
                <MarketBox markets={data.filter(item => item.type === 'market') as MarketItem[]} />}
            
            {data.filter(item => item.type === 'preview').length > 0 && 
                <PredictionPreviewList predictions={data.filter(item => item.type === 'preview') as PredictionPreviewItem[]} />}
        </>
    );
};

const CompItem = ({ icon, title, data }: PageProps) => {
    return (
        <div className="flex flex-col mx-3 mt-2 gap-3 text-xs">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3 items-center">
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
            <HandleWhichComponent data={data} />
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

export default function Page() {
    return (
        <main className="flex flex-col gap-5">
            {data.categories.map((category, index) => (
                <CompItem
                    key={index}
                    icon={getCategoryIcon(category.title)}
                    title={category.title}
                    data={category.data}
                />
            ))}
            <Partners />
            <Footer />
        </main>
    );
}
