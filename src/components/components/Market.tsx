"use client";


import { HalfCircleProgress } from "../HalfCircleProgress";

export type MarketItem = {
  id: string;
  title: string;
  probability: number;
  totalVolume: string;
  imageUrl: string;
};

interface IBoxProps {
  markets: MarketItem[];
}

export default function MarketBox({ markets }: IBoxProps) {
  if (!Array.isArray(markets)) return null;

  return (
    <div className="flex flex-col space-y-4">
      {markets.map((market) => {
        if (!market?.id || !market?.title) return null;

        return (
          <div
            key={market.id}
            className="w-full h-[200px] p-5 flex flex-col justify-between rounded-xl bg-gray-800"
          >
            <div>
              <div className="flex items-center space-x-3">
                <img
                  src={market.imageUrl || ''}
                  alt="flag"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex justify-between grow">
                  <div className="flex w-[60%] mr-auto items-center">
                    <p className="text-white font-bold text-xs">{market.title}</p>
                  </div>
                  <HalfCircleProgress probability={market.probability ?? 0} />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center mt-4">
                <button className="bg-[#6BD932] px-4 py-2 mr-[5px] text-white rounded-lg font-bold flex-1 text-xs">
                  Buy Yes ↑
                </button>
                <button className="bg-[#FE4E4F] px-4 py-2 ml-[5px] text-white rounded-lg font-bold flex-1 text-xs">
                  Buy No ↓
                </button>
              </div>
              <div className="flex flex-row justify-between mt-3">
                <p className="text-gray-400 text-[0.65rem]">{market.totalVolume} Vol.</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
