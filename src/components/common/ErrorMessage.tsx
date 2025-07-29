'use client';

import React, { useState } from 'react';

interface ErrorMessageProps {
  message: string;
  error?: string;
  onRetry?: () => void;
}

/**
 * Error Message Component
 * 
 * Displays an error message with optional details and retry button
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  error, 
  onRetry 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 max-w-md">
        <strong className="font-bold block mb-1">{message}</strong>
        
        {error && (
          <>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm underline mt-1"
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
            
            {showDetails && (
              <p className="text-xs mt-2 p-2 bg-red-50 rounded overflow-auto max-h-32">
                {error}
              </p>
            )}
          </>
        )}
      </div>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-bb-accent text-white rounded-md hover:bg-opacity-80 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
