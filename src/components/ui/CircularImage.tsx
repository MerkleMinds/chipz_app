"use client";

import Image from 'next/image';
import { CSSProperties, useState } from 'react';

interface CircularImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

/**
 * A reusable circular image component that maintains consistent styling
 * across the application.
 */
export default function CircularImage({ 
  src, 
  alt, 
  size = 40, 
  className = ''
}: CircularImageProps) {
  const [hasError, setHasError] = useState(false);
  
  // Calculate container style with the specified size
  const containerStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    minWidth: `${size}px`, // Ensure minimum width is enforced
    minHeight: `${size}px` // Ensure minimum height is enforced
  };

  // Use a placeholder if the source is empty or there was an error loading the image
  const imageSrc = !src || hasError 
    ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM0QjU1NjMiLz48L3N2Zz4='
    : src;

  return (
    <div 
      className={`relative rounded-full overflow-hidden flex-shrink-0 ${className}`} 
      style={containerStyle}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-cover"
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          onError={() => setHasError(true)}
          priority={size > 64} // Prioritize loading for larger images
        />
      </div>
    </div>
  );
}
