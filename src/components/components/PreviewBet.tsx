import React from 'react';

import { HalfCircleProgress } from '../HalfCircleProgress';

export type PredictionPreviewItem = {
    id: string;
    title: string;
    probability: number;
    totalVolume: string;
    imageUrl: string;
};

interface PredictionPreviewListProps {
    predictions: PredictionPreviewItem[];
}

export default function PredictionPreviewList({ predictions }: PredictionPreviewListProps) {
    if (!Array.isArray(predictions)) return null;

    return (
        <div className="flex flex-col w-full space-y-4">
            {predictions.map((prediction) => {
                if (!prediction?.id || !prediction?.title) return null;
                
                return (
                    <div
                        key={prediction.id}
                        className="w-full h-20 p-5 flex items-center justify-between border border-neutral-700 rounded-xl bg-gray-800"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="">
                                <img
                                    src={prediction.imageUrl || ''}
                                    alt="flag"
                                    className="w-8 h-8 rounded-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-white">{prediction.title}</h3>
                            </div>
                        </div>
                        <div className="">
                            <HalfCircleProgress probability={prediction.probability ?? 0} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}