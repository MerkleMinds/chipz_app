"use client";

import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { ItemsRenderer } from "@/components/ItemsRenderer";
import { CategoryData } from "@/utils/data/types";

// Reuse the same data structure from SectionContent
export interface TrendingData {
    categories: CategoryData[];
}

export default function TrendingContent({ data }: { data: TrendingData }) {
    const allItems = data.categories.reduce<CategoryData['items'][]>(
        (acc, category) => [...acc, category.items], 
        []
    );
    
    return (
        <main className="flex flex-col w-full">
            {/* Add style for hiding scrollbars if needed */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            
            <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 mt-2 gap-6">
                {/* Render all items from all categories without titles */}
                {allItems.map((items, index) => (
                    <ItemsRenderer 
                        key={index} 
                        items={items} 
                        layoutMode="vertical" 
                        containerClassName="w-full"
                    />
                ))}
            </div>
            
            <Partners />
            <Footer />
        </main>
    );
}
