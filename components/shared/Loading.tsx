import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { SKELETON_COUNT } from '../../lib/constants';

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export const LoadingSkeleton = React.memo<LoadingSkeletonProps>(({ 
  count = SKELETON_COUNT,
  className = 'w-64 h-96 sm:w-72' 
}) => {
  return (
    <div className='flex flex-row gap-4'>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton 
          key={index} 
          className={`${className} animate-pulse`} 
        />
      ))}
    </div>
  );
});

LoadingSkeleton.displayName = 'LoadingSkeleton';

export const LoadingSpinner = React.memo<{ className?: string }>(({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
      </div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

// Grid loading skeleton for search/browse pages
export const GridLoadingSkeleton = React.memo<{ count?: number }>(({ count = 10 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className="aspect-[2/3] bg-gray-900 rounded-lg animate-pulse"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
});

GridLoadingSkeleton.displayName = 'GridLoadingSkeleton';
