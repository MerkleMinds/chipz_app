"use client";

import { formatDistanceToNow } from "date-fns";
import { FaTrophy, FaClock, FaInfoCircle } from "react-icons/fa";

interface ResolvedEventBannerProps {
  resolvedDate: string;
  winningOutcome: string;
  finalOdds: Record<string, number> | { yes: number; no: number } | number;
  resolutionSource?: string;
  resolutionDetails?: string;
  userPosition?: {
    outcome: string;
    stake: number;
    profit?: number;
    loss?: number;
  };
}

export default function ResolvedEventBanner({
  resolvedDate,
  winningOutcome,
  finalOdds,
  resolutionSource,
  resolutionDetails,
  userPosition
}: ResolvedEventBannerProps) {
  // Format the resolved date to show how long ago it was resolved
  const formattedDate = formatDistanceToNow(new Date(resolvedDate), { addSuffix: true });
  
  // Format odds for display
  const formatOddsDisplay = () => {
    if (typeof finalOdds === 'number') {
      return `${finalOdds}%`;
    } else if ('yes' in finalOdds && 'no' in finalOdds) {
      return `YES: ${(finalOdds.yes * 100).toFixed(1)}% / NO: ${(finalOdds.no * 100).toFixed(1)}%`;
    } else {
      // Handle multi-option odds
      const entries = Object.entries(finalOdds);
      if (entries.length === 0) return 'N/A';
      
      if (entries.length <= 2) {
        return entries.map(([key, value]) => `${key}: ${(value * 100).toFixed(1)}%`).join(' / ');
      } else {
        // Winner odds + total others
        const winner = entries.find(([key]) => key === winningOutcome);
        return winner ? `${winner[0]}: ${(winner[1] * 100).toFixed(1)}%` : 'N/A';
      }
    }
  };

  return (
    <div className="fixed bottom-[64px] left-0 right-0 z-10 bg-gray-900 p-4 border-t border-chipz-primary">
      <div className="w-full max-w-sm mx-auto">
        <div className="rounded-lg bg-gray-800 p-4 shadow-lg">
          {/* Status Banner */}
          <div className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2">
            <div className="flex items-center gap-2">
              <div className="bg-chipz-primary p-1 rounded-full">
                <FaTrophy className="text-white text-sm" />
              </div>
              <span className="text-white font-bold">RESOLVED</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <FaClock />
              <span>{formattedDate}</span>
            </div>
          </div>
          
          {/* Winning Outcome */}
          <div className="mb-3">
            <div className="text-xs text-gray-400 mb-1">Winning Outcome</div>
            <div className="text-green-400 font-bold">{winningOutcome}</div>
          </div>
          
          {/* Final Odds */}
          <div className="mb-3">
            <div className="text-xs text-gray-400 mb-1">Final Odds</div>
            <div className="text-white">{formatOddsDisplay()}</div>
          </div>
          
          {/* User Position (if available) */}
          {userPosition && (
            <div className="mb-3 border-t border-gray-700 pt-2">
              <div className="text-xs text-gray-400 mb-1">Your Position</div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <span className="text-white">{userPosition.outcome}</span>
                  <span className="text-gray-400 text-xs">(${userPosition.stake})</span>
                </div>
                {userPosition.profit ? (
                  <span className="text-green-400">+${userPosition.profit}</span>
                ) : (
                  <span className="text-red-400">-${userPosition.loss}</span>
                )}
              </div>
            </div>
          )}
          
          {/* Resolution Details */}
          {(resolutionSource || resolutionDetails) && (
            <div className="bg-gray-700 bg-opacity-30 rounded p-2 mt-2 text-xs">
              <div className="flex items-start gap-2">
                <FaInfoCircle className="text-chipz-primary mt-0.5" />
                <div>
                  {resolutionSource && <div className="text-white">Source: {resolutionSource}</div>}
                  {resolutionDetails && <div className="text-gray-300 mt-1">{resolutionDetails}</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
