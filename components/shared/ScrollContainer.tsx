import React from 'react';

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollContainer = React.memo<ScrollContainerProps>(({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 pb-2 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6">
        {children}
      </div>
    </div>
  );
});

ScrollContainer.displayName = 'ScrollContainer';
