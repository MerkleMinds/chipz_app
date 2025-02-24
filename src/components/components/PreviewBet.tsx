import React from 'react';

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
    return (
        <div className="flex flex-col space-y-4">
            {predictions.map((prediction) => (
                <div
                    key={prediction.id}
                    className="w-full h-20 p-2 flex items-center justify-between border border-neutral-700 rounded-xl bg-gray-800"
                >
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 border border-neutral-600 rounded">
                            <img
                                src={prediction.imageUrl}
                                alt="flag"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-sm font-semibold text-white">{prediction.title}</h3>
                        </div>
                    </div>
                    <div className="text-white">
                        {prediction.probability}%
                    </div>
                </div>
            ))}
        </div>
    );
}