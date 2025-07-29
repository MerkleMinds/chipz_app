'use client';

import React from 'react';
import { useHomepage } from '@/app/api/hooks/useApi';
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { FaAnglesRight } from "react-icons/fa6";
import Link from "next/link";
import sections, { getCategoryIcon } from "@/utils/data/sections";
import { ItemsRenderer } from "@/components/ItemsRenderer";
import { CategoryData } from "@/utils/data/types";
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

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

export function HomePage() {
    // Use our custom hook to fetch homepage data
    const { data, loading, error, refetch } = useHomepage();
    
    // Show loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <LoadingSpinner />
            </div>
        );
    }
    
    // Show error state with retry button
    if (error) {
        return (
            <ErrorMessage 
                message="Failed to load homepage data" 
                error={error} 
                onRetry={refetch} 
            />
        );
    }
    
    // If no data, show empty state
    if (!data || !data.trending_events || !data.featured_categories) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
                <p className="text-gray-400 mb-4">No data available</p>
                <button 
                    onClick={refetch}
                    className="px-4 py-2 bg-bb-accent text-white rounded-md hover:bg-opacity-80 transition-colors"
                >
                    Refresh
                </button>
            </div>
        );
    }
    
    // Transform API data to match the expected format for the components
    const transformedData = {
        categories: sections.map(section => {
            // Find trending events for this category
            const categoryEvents = data.trending_events.filter(
                event => event.category_name.toLowerCase() === section.name.toLowerCase()
            );
            
            // Create items for this category
            const items: CategoryData['items'] = {
                multiChoice: categoryEvents
                    .filter(event => event.outcomes_count > 1)
                    .slice(0, 5)
                    .map(event => ({
                        type: "number",
                        id: event.id.toString(),
                        title: event.name,
                        totalVolume: "N/A", // API doesn't provide this yet
                        imageUrl: "", // API doesn't provide this yet
                        options: [] // We'll need to fetch outcomes separately
                    })),
                
                trends: categoryEvents
                    .filter(event => event.outcomes_count <= 1)
                    .slice(0, 5)
                    .map(event => ({
                        type: "trend",
                        id: event.id.toString(),
                        title: event.name,
                        probability: 0.5, // Default value
                        probabilityChange: "+0.0", // Default value
                        image: "", // API doesn't provide this yet
                        history: [] // We'll need historical data
                    }))
            };
            
            return {
                title: section.name,
                items
            };
        })
    };
    
    return (
        <main className="flex flex-col gap-y-5">
            {transformedData.categories.map((category, index) => (
                <CompItem
                    key={index}
                    icon={getCategoryIcon(category.title, 'inline-block text-bb-accent', 16)}
                    title={category.title}
                    items={category.items}
                />
            ))}
            <Partners />
            <Footer />
        </main>
    );
}
