import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  unoptimizeOnError?: boolean;
}

/**
 * A wrapper around Next.js Image component that handles CDN blocking issues
 * Falls back to unoptimized images if the CDN blocks Next.js optimization
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  fallbackSrc,
  unoptimizeOnError = true,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isUnoptimized, setIsUnoptimized] = useState(false);

  const handleError = () => {
    console.warn(`Failed to load optimized image: ${src}`);
    
    if (unoptimizeOnError && !isUnoptimized) {
      // Try unoptimized version first
      setIsUnoptimized(true);
    } else if (fallbackSrc && imgSrc !== fallbackSrc) {
      // If unoptimized fails and we have a fallback, use it
      setImgSrc(fallbackSrc);
      setIsUnoptimized(true);
    }
  };

  // For external CDN images that might block optimization
  const shouldUnoptimize = 
    typeof src === 'string' && 
    (src.includes('hanime-cdn.com') || src.includes('cdn.discordapp.com'));

  return (
    <Image
      {...props}
      src={imgSrc}
      unoptimized={isUnoptimized || shouldUnoptimize}
      onError={handleError}
    />
  );
};

/**
 * Simple img tag wrapper for external CDNs that block optimization
 * Use this when Next.js Image optimization is definitely not needed
 */
interface SimpleImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const SimpleImage: React.FC<SimpleImageProps> = ({ 
  src, 
  alt, 
  className = '',
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      console.warn(`Failed to load image: ${src}`);
      setError(true);
      // Could set a fallback image here
      // setImgSrc('/placeholder.png');
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};
