'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

/**
 * Loading Spinner Component
 * 
 * Displays a loading spinner with customizable size and color
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  color = 'text-bb-accent'
}) => {
  // Determine size class
  const sizeClass = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }[size];

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClass} ${color} animate-spin rounded-full border-4 border-solid border-current border-r-transparent`} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
