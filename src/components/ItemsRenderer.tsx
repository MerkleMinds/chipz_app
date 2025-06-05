"use client";

import MarketBox from "@/components/components/Market";
import PredictionPreviewList from "@/components/components/PreviewBet";
import MarketTrend from "@/components/components/MarketTrend";
import MarketNbrBox from "@/components/components/MarketNbr";
import { CategoryData } from "@/utils/data/types";

interface ItemsRendererProps {
    items: CategoryData['items'];
    layoutMode?: 'vertical' | 'horizontal' | 'grid';
    containerClassName?: string;
}

// Component to render all items based on layout mode
export const ItemsRenderer = ({ 
    items, 
    layoutMode = 'horizontal',
    containerClassName = ''
}: ItemsRendererProps) => {
    if (!items) return null;
    
    // Wrapper component that makes all child components w-full by default
    const renderItem = (component: JSX.Element, index: number, extraClasses: string = '') => {
        const baseClasses = "w-full";
        const layoutClasses = {
            'vertical': 'mb-6', // Vertical spacing for vertical layout
            'horizontal': 'min-w-[300px]', // Minimum width for horizontal scrolling
            'grid': '' // No additional classes for grid layout
        };
        
        return (
            <div key={index} className={`${baseClasses} ${layoutClasses[layoutMode]} ${extraClasses}`}>
                {component}
            </div>
        );
    };

    // Render container based on layout mode
    const renderContainer = (children: JSX.Element[]) => {
        if (children.length === 0) return null;
        
        switch (layoutMode) {
            case 'horizontal':
                return (
                    <div className={`flex flex-row gap-4 overflow-x-auto pb-4 hide-scrollbar ${containerClassName}`}
                         style={{ 
                             scrollbarWidth: 'none', /* Firefox */
                             msOverflowStyle: 'none',  /* IE and Edge */
                         }}>
                        {children}
                    </div>
                );
            case 'grid':
                return (
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center ${containerClassName}`}>
                        {children}
                    </div>
                );
            case 'vertical':
            default:
                return <div className={`w-full flex flex-col ${containerClassName}`}>{children}</div>;
        }
    };

    // Prepare all components to render
    const components: JSX.Element[] = [];
    
    // Add trend items
    if (items.trends && items.trends.length > 0) {
        items.trends.forEach((item, index) => {
            // Ensure we have all required properties for MarketTrend
            const marketItem = {
                ...item,
                title: item.title || '',
                probability: typeof item.probability === 'number' ? item.probability : 0,
                image: item.image || '',
                probabilityChange: item.probabilityChange || '+0'
            };
            
            // Set fullWidth to true when in vertical layout mode (trending page)
            const shouldBeFullWidth = layoutMode === 'vertical';
            
            components.push(
                renderItem(
                    <MarketTrend 
                        key={`trend-${index}`} 
                        markets={[marketItem]}
                        fullWidth={shouldBeFullWidth}
                    />,
                    index
                )
            );
        });
    }
    
    // Add multiChoice items
    if (items.multiChoice && items.multiChoice.length > 0) {
        items.multiChoice.forEach((item, index) => {
            components.push(
                renderItem(
                    <MarketNbrBox 
                        key={`multi-${index}`} 
                        markets={[item]} 
                    />,
                    items.trends?.length || 0 + index
                )
            );
        });
    }
    
    // Add market items
    if (items.market && items.market.length > 0) {
        items.market.forEach((item, index) => {
            components.push(
                renderItem(
                    <MarketBox 
                        key={`market-${index}`} 
                        markets={[item]} 
                    />,
                    (items.trends?.length || 0) + (items.multiChoice?.length || 0) + index
                )
            );
        });
    }
    
    // Add preview items
    if (items.previews && items.previews.data.length > 0) {
        // Use grid layout if specified in the preview items
        const previewLayoutMode = items.previews.displayMode === 'grid' ? 'grid' : layoutMode;
        
        items.previews.data.forEach((item, index) => {
            components.push(
                renderItem(
                    <PredictionPreviewList 
                        key={`preview-${index}`} 
                        predictions={[item]} 
                    />,
                    (items.trends?.length || 0) + 
                    (items.multiChoice?.length || 0) + 
                    (items.market?.length || 0) + 
                    index,
                    previewLayoutMode === 'horizontal' ? 'min-w-[300px]' : ''
                )
            );
        });
    }
    
    return renderContainer(components);
};

export default ItemsRenderer;
