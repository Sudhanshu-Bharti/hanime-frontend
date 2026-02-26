import React, { useEffect, useMemo, useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  unoptimizeOnError?: boolean;
}

const IMAGE_PROXY_HOSTS = [
  'hanime-cdn.com',
];

const shouldProxyImage = (urlString: string): boolean => {
  if (urlString.startsWith('/api/proxy-image?')) return false;
  const normalized = urlString.startsWith('//') ? `https:${urlString}` : urlString;
  try {
    const url = new URL(normalized);
    const host = url.hostname;
    return IMAGE_PROXY_HOSTS.some(h => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
};

const getProxiedImageSrc = (src: ImageProps['src']): ImageProps['src'] => {
  if (typeof src !== 'string') return src;
  const useProxy = process.env.NEXT_PUBLIC_USE_IMAGE_PROXY !== '0';
  if (!useProxy || !shouldProxyImage(src)) return src;
  return `/api/proxy-image?url=${encodeURIComponent(src)}`;
};

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
  const initialSrc = useMemo(() => getProxiedImageSrc(src), [src]);
  const [imgSrc, setImgSrc] = useState<ImageProps['src']>(initialSrc);
  const [isUnoptimized, setIsUnoptimized] = useState(false);

  useEffect(() => {
    setImgSrc(initialSrc);
  }, [initialSrc]);

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

  // For all external CDN images, we bypass Vercel's image optimization 
  // to stay within the 1000-image/month Free Tier limit.
  // We rely on the browser's native lazy loading and the CDN's own optimization.
  const isExternal = typeof src === 'string' && (
    src.startsWith('http') ||
    src.startsWith('//') ||
    src.startsWith('/api/proxy-image?')
  );
  const shouldUnoptimize = isExternal || isUnoptimized;

  return (
    <Image
      {...props}
      src={imgSrc}
      unoptimized={shouldUnoptimize}
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
  const initialSrc = useMemo(() => getProxiedImageSrc(src), [src]);
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImgSrc(initialSrc);
  }, [initialSrc]);

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
