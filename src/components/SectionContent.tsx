"use client";

// No need for direct icon imports as we're using the centralized getCategoryIcon
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { ItemsRenderer } from "@/components/ItemsRenderer";
import { CategoryData } from "@/utils/data/types";
import { getCategoryIcon } from "@/utils/data/sections";

export interface SectionData {
    categories: CategoryData[];
    showSeeMore?: boolean;
}

const HandleWhichComponent = ({ items }: { items: CategoryData['items'] }) => {
    return <ItemsRenderer items={items} layoutMode="horizontal" />;
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
                    <h1 className="text-white font-bold font-just text-sm capitalize">
                        {title}
                    </h1>
                </div>

            </div>
            <HandleWhichComponent items={items} />
        </div>
    );
};

// Using centralized getCategoryIcon from sections.tsx

export default function SectionContent({ data }: { data: SectionData }) {
    return (
        <main className="flex flex-col gap-y-5">
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            
            {data.categories.map((category, index) => (
                <CompItem
                    key={index}
                    icon={getCategoryIcon(category.title, 'inline-block text-bb-accent', 20)}
                    title={category.title}
                    items={category.items}
                />
            ))}
            <Partners />
            <Footer />
        </main>
    );
}
