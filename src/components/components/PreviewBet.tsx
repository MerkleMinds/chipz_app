"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import CircularImage from '../ui/CircularImage';
import { HalfCircleProgress } from '../HalfCircleProgress';

export type PredictionPreviewItem = {
    id: string;
    title: string;
    probability: number;
    imageUrl: string;
};

interface PredictionPreviewListProps {
    predictions: PredictionPreviewItem[];
}

export default function PredictionPreviewList({ predictions }: PredictionPreviewListProps) {
    const router = useRouter();
    if (!Array.isArray(predictions)) return null;

    return (
        <div className="flex flex-col w-[300px] space-y-4">
            {predictions.map((prediction) => {
                if (!prediction?.id || !prediction?.title) return null;
                
                return (
                    <div
                        key={prediction.id}
                        onClick={() => router.push(`/events/${prediction.id}`)}
                        className="w-full h-20 p-5 flex items-center justify-between rounded-xl bg-gray-800 cursor-pointer"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="">
                                <CircularImage
                                    src={prediction.imageUrl || ''}
                                    alt="flag"
                                    size={40}
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