import { useState } from 'react';

interface MarketSelectionItem {
	title: string;
	imageUrl: string;
	multiplier: number;
	betType: string;
}

interface IBetSlipBet {
	id: string;
	chosen: string;
	bet: string;
	match: string;
	odds: number;
	betType?: string;
	multiplier?: number;
}

interface StakeControlProps {
	selection: MarketSelectionItem | IBetSlipBet;
}

export const StakeControl = ({ selection }: StakeControlProps) => {
	const [amount, setAmount] = useState(10);

	const handleAmountChange = (value: number) => {
		if (value >= 1) setAmount(value);
	};

	const betType = 'betType' in selection ? selection.betType : selection.bet;
	const multiplier = 'multiplier' in selection ? selection.multiplier : selection.odds;

	return (
		<div className="mt-4 text-white">
			<div className="flex flex-row gap-x-4">
				<div className="flex flex-1 flex-row items-center border border-gray-400 rounded-xl px-3 py-2 w-40 text-white">
					<div>
						<input
							type="number"
							value={amount}
							min="1"
							onChange={(e) => handleAmountChange(Number(e.target.value))}
							className="bg-transparent w-[35%] text-center focus:outline-none"
						/>
						<span className="text-white">$</span>
					</div>
					<div className="space-x-1 flex flex-row">
						<button
							onClick={() => handleAmountChange(amount + 1)}
							className="text-[8px] text-gray-400 border border-gray-400 rounded-md px-1 py-1"
						>
							25%
						</button>
						<button
							onClick={() => handleAmountChange(amount + 10)}
							className="text-[8px] text-gray-400 border border-gray-400 rounded-md px-1 py-1"
						>
							50%
						</button>
						<button
							onClick={() => handleAmountChange(amount + 10)}
							className="text-[8px] text-gray-400 border border-gray-400 rounded-md px-1 py-1"
						>
							Max
						</button>
					</div>
				</div>
				<div className=" flex flex-1 items-center">
					<input
						type="range"
						min="1"
						max="100"
						value={amount}
						onChange={(e) => handleAmountChange(Number(e.target.value))}
						className="w-full accent-purple-500"
					/>
				</div>
			</div>
		</div>
	);
}; 