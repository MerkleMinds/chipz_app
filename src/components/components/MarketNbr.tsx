"use client";

import { useAppContext } from "@/components/Context";
import { hashBet } from "@/components/bets/Betv2";
import { useRouter } from "next/navigation";


export type MarketNbrItem = {
	id: string;
	title: string;
	imageUrl: string;
	totalVolume: string;
	options: { name: string; probability: number }[];
};

export type MarketNbrBoxProps = {
	markets: MarketNbrItem[];
};

function MarketPrices({ marketData, onSelect }: { marketData: MarketNbrItem["options"], onSelect: (betType: "yes" | "no", probability: number) => void }) {
	if (!Array.isArray(marketData)) return null;
	
	return (
		<div className="flex flex-col w-full">
			{marketData.map((option, index) => (
				<div key={index} className="flex justify-between items-center my-1">
					<p className="text-white text-xs">{option?.name || 'Unknown'}</p>
					<div className="flex items-center">
						<p className="text-white font-bold text-xs">{option?.probability ?? 0}%</p>
						<div className="flex gap-x-2 ml-3">
							<button onClick={(e) => {
									e.stopPropagation();	
									onSelect("yes", option.probability)
								}}
								className="bg-[#111827] text-white text-xs w-[35px] py-2 rounded text-center">Yes</button>
							<button onClick={(e) => {
									e.stopPropagation();	
									onSelect("no", option.probability)
								}}
								className="bg-[#111827] text-white text-xs w-[35px] py-2 rounded text-center">No</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default function MarketNbrBox({ markets }: MarketNbrBoxProps) {
	const router = useRouter();
	const { bets: [, setBets], show: [, setShow] } = useAppContext();
	
	if (!Array.isArray(markets)) return null;

	const handleSelect = (market: MarketNbrItem, betType: "yes" | "no", probability: number) => {
		if (!market?.id || !market?.title) return;
		
		const selectedOption = market.options.find(opt => opt.probability === probability);
		if (!selectedOption) return;

		const bet = {
			id: hashBet({
				date: new Date(),
				title: market.title,
			}),
			chosen: selectedOption.name,
			bet: betType,
			match: market.title,
			odds: probability,
		};

		setBets((bets) => [bet, ...bets]);
		setShow(true);
	};

	const handleLinkClick = (id: string) => {
		router.push(`/events/${id}`);
	};

	return (
		<div className="flex grow flex-col space-y-4 justify-center min-w-[300px]">
			{markets.map((market) => (
				<div key={market.id} className="p-5 w-full border border-neutral-700 rounded-xl bg-gray-800" onClick={() => handleLinkClick(market.id)}>
					<div>
						<div className="flex items-center space-x-3 cursor-pointer">
							<img
								src={market.imageUrl}
								alt="flag"
								className="w-8 h-8 rounded-full"
							/>
							<p className="text-white font-bold text-sm">{market.title}</p>
						</div>
						<div className="mt-4">
							<MarketPrices 
								marketData={market.options} 
								onSelect={(betType, probability) => handleSelect(market, betType, probability)} 
							/>
						</div>
					</div>
					<div className="flex justify-between items-end mt-3">
						<p className="text-gray-400 text-[0.65rem]">{market.totalVolume} Vol.</p>
					</div>
				</div>
			))}
		</div>
	);
}
