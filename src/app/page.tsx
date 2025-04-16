import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { FaLandmark, FaFootball, FaPiggyBank, FaAnglesRight } from "react-icons/fa6";
import MarketBox, { type MarketItem } from "@/components/components/Market";
import PredictionPreviewList, { type PredictionPreviewItem } from "@/components/components/PreviewBet";
import MarketTrend, { type MarketTrendData } from "@/components/components/MarketTrend";
import MarketNbrBox, { type MarketNbrItem } from "@/components/components/MarketNbr";
// Import data directly - this is the default approach for static builds
import homeData from "@/utils/data/sections/home.json";

interface HomeData {
    categories: CategoryData[];
}

interface CategoryData {
    id?: string;
    title: string;
    items: {
        trends?: MarketTrendData[];
        multiChoice?: MarketNbrItem[];
        previews?: {
            displayMode?: 'slider' | 'grid' | string;
            data: PredictionPreviewItem[];
        };
        market?: MarketItem[];
    };
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

interface PageProps {
    icon: JSX.Element;
    title: string;
    items: CategoryData['items'];
}

const CompItem = ({ icon, title, items }: PageProps) => {
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

// Only fetch from API if specifically enabled
async function getHomeData(): Promise<HomeData> {
    // Check if API fetching is explicitly enabled
    const useApi = process.env.NEXT_PUBLIC_USE_API_FETCH === 'true';
    
    if (useApi) {
        try {
            // For server components, we need an absolute URL
            const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
            const host = process.env.VERCEL_URL || 'localhost:3000';
            const baseUrl = `${protocol}://${host}`;
            
            const res = await fetch(`${baseUrl}/api/home`, { 
                next: { revalidate: 3600 } // Revalidate every hour
            });
            
            if (!res.ok) {
                throw new Error('Failed to fetch home data');
            }
            
            return res.json();
        } catch (error) {
            console.error('API fetch failed, using static import:', error);
            // Fall back to static import if API fetch fails
            return homeData;
        }
    }
    
    // Default: use static import
    return homeData;
}

// Page is now an async component
export default async function Page() {
    // Get data either from API (if enabled) or static import
    const data = await getHomeData();
    
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
