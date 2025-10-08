import { useRef, RefObject } from 'react';
import { SCROLL_AMOUNT } from '../lib/constants';
import type { ScrollDirection } from '../types';

interface UseScrollContainerReturn {
  scrollContainerRef: RefObject<HTMLDivElement>;
  scroll: (direction: ScrollDirection) => void;
}

/**
 * Hook for managing horizontal scroll containers
 */
export function useScrollContainer(): UseScrollContainerReturn {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: ScrollDirection) => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
      scrollContainerRef.current.scrollBy({ 
        left: amount, 
        behavior: 'smooth' 
      });
    }
  };

  return { scrollContainerRef, scroll };
}
