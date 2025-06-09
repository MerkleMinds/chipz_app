import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { FaLandmark, FaFootball, FaPiggyBank, FaAnglesRight } from "react-icons/fa6";
// Import data service and types
import { getHomeData } from "@/utils/data/dataService";
import { CategoryData } from "@/utils/data/types";
import Link from "next/link";
import sections from "@/utils/data/sections";
import { ItemsRenderer } from "@/components/ItemsRenderer";


const HandleWhichComponent = ({ items }: { items: CategoryData['items'] }) => {
    return <ItemsRenderer items={items} layoutMode="horizontal" />;
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
                    <Link href={sectionPath}>
                        <span className="text-white font-bold font-just text-sm">
                            {title}
                        </span>
                    </Link>
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
