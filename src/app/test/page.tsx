import data from "@/utils/data/components.json" with { type: "json" };
import MarketBox, { type MarketItem } from "@/components/components/Market";
import MarketNbrBox, { type MarketNbrItem } from "@/components/components/MarketNbr";
import OnBuyClickBox, { type MarketSelectionItem } from "@/components/components/OnBuyClick";
import MarketTrendsBox, { type MarketTrendItem} from "@/components/components/MarketTrendchart";

export default function Page() {
  return (
    <div className="w-full flex flex-col justify-center mb-[10rem]">
      <MarketBox markets={data.markets as MarketItem[]} />
      <div className="my-5"></div>
      <MarketNbrBox markets={data.marketMultiChoice as MarketNbrItem[]} />
      <div className="my-5"></div>
      <OnBuyClickBox selections={data.onBuyClickSelections as MarketSelectionItem[]} />
      <div className="my-5"></div>
      <MarketTrendsBox trends={data.marketTrends as MarketTrendItem[]} />
    </div>
  );
}
