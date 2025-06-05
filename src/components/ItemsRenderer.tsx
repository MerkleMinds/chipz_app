"use client";

import MarketBox from "@/components/components/Market";
import PredictionPreviewList from "@/components/components/PreviewBet";
import MarketTrend, { MarketTrendData } from "@/components/components/MarketTrend";
import MarketNbrBox, { MarketNbrItem } from "@/components/components/MarketNbr";
import { CategoryData } from "@/utils/data/types";

// Type definition for items with marketType field
type MarketWithType = {
    id: string;
    marketType?: 'trend' | 'number';
    [key: string]: any;
};

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
    
    // STEP 1: First collect all items with explicit marketType fields for proper rendering
    // These will take precedence over the category-based rendering
    const trendsWithType: Array<any> = [];
    const numbersWithType: Array<any> = [];
    
    // Track which items have already been handled by marketType to avoid duplicates
    const handledItemIds = new Set<string>();
    
    // Extract items from all sources and organize by marketType
    const extractMarketType = (itemArray: any[], source: string) => {
        if (!itemArray || !Array.isArray(itemArray)) return;
        
        itemArray.forEach(item => {
            // Skip items that don't have an id
            if (!item.id) return;
            
            const marketItem = item as MarketWithType;
            
            // Add to the appropriate collection based on marketType
            if (marketItem.marketType === 'trend') {
                trendsWithType.push({...item, _source: source});
                handledItemIds.add(item.id);
            } else if (marketItem.marketType === 'number') {
                numbersWithType.push({...item, _source: source});
                handledItemIds.add(item.id);
            }
        });
    };
    
    // Check all potential sources for markets with explicit marketType fields
    // The order matters - we want to process all items with explicit marketType first
    if (items.trends) extractMarketType(items.trends, 'trends');
    if (items.multiChoice) extractMarketType(items.multiChoice, 'multiChoice');
    if (items.market) extractMarketType(items.market, 'market');
    
    // STEP 2: Render items from trends category (if they don't have explicit marketType and haven't been handled)
    if (items.trends && items.trends.length > 0) {
        items.trends.forEach((item, index) => {
            // Skip items that have already been processed by marketType
            if (item.id && handledItemIds.has(item.id)) return;
            
            const marketItem = item as MarketWithType;
            // Only render as trend if it doesn't have an explicit marketType
            if (!marketItem.marketType) {
                // Ensure the item has all required properties for MarketTrend
                const itemAny = item as any;
                const trendItem: MarketTrendData = {
                    id: item.id || '',
                    title: item.title || '',
                    probability: typeof item.probability === 'number' ? item.probability : 0,
                    image: itemAny.image || '',
                    probabilityChange: itemAny.probabilityChange || '+0',
                    history: itemAny.history || []
                };
                
                // Set fullWidth to true when in vertical layout mode (trending page)
                const shouldBeFullWidth = layoutMode === 'vertical';
                
                components.push(
                    renderItem(
                        <MarketTrend 
                            key={`trend-${index}`} 
                            markets={[trendItem]}
                            fullWidth={shouldBeFullWidth}
                        />,
                        index
                    )
                );
            }
        });
    }
    
    // STEP 3: Render items from multiChoice category (if they don't have explicit marketType and haven't been handled)
    if (items.multiChoice && items.multiChoice.length > 0) {
        items.multiChoice.forEach((item, index) => {
            // Skip items that have already been processed by marketType
            if (item.id && handledItemIds.has(item.id)) return;
            
            const marketItem = item as MarketWithType;
            // Only render as number if it doesn't have an explicit marketType
            if (!marketItem.marketType) {
                // Make sure the item has all required properties for MarketNbrBox
                const itemAny = item as any;
                if (!itemAny.options) itemAny.options = [];
                
                components.push(
                    renderItem(
                        <MarketNbrBox 
                            key={`multi-${index}`} 
                            markets={[item as any]} 
                        />,
                        (items.trends?.length || 0) + index
                    )
                );
            }
        });
    }
    
    // STEP 4: Render generic market items with legacy approach (only those without explicit marketType and not handled)
    if (items.market && items.market.length > 0) {
        items.market.forEach((item, index) => {
            // Skip items that have already been processed by marketType
            if (item.id && handledItemIds.has(item.id)) return;
            
            // Skip items that have explicit marketType, as they'll be handled separately
            const marketItem = item as MarketWithType;
            if (marketItem.marketType === 'trend' || marketItem.marketType === 'number') {
                return; // Skip this item, it will be rendered in the next steps
            }
            
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
    
    // STEP 5: Render all items with explicit marketType="number"
    numbersWithType.forEach((item, index) => {
        // Ensure the item has all properties needed for MarketNbrBox
        const itemAny = item as any;
        // Make sure we have the required options property
        if (!itemAny.options) {
            itemAny.options = [];
        }
        
        components.push(
            renderItem(
                <MarketNbrBox 
                    key={`explicit-nbr-${index}`} 
                    markets={[itemAny as MarketNbrItem]}
                />,
                (items.trends?.length || 0) + 
                (items.multiChoice?.length || 0) + 
                (items.market?.length || 0) + index
            )
        );
    });
    
    // STEP 6: Render all items with explicit marketType="trend"
    trendsWithType.forEach((item, index) => {
        // Convert to expected trend format
        const itemAny = item as any;
        const trendItem: MarketTrendData = {
            id: item.id || '',
            title: item.title || '',
            probability: typeof item.probability === 'number' ? item.probability : 0,
            image: itemAny.imageUrl || itemAny.image || '',
            probabilityChange: itemAny.probabilityChange || '+0',
            history: itemAny.history || []
        };
        
        components.push(
            renderItem(
                <MarketTrend 
                    key={`explicit-trend-${index}`} 
                    markets={[trendItem]}
                    fullWidth={layoutMode === 'vertical'}
                />,
                (items.trends?.length || 0) + 
                (items.multiChoice?.length || 0) + 
                (items.market?.length || 0) + 
                numbersWithType.length + index
            )
        );
    });
    
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
