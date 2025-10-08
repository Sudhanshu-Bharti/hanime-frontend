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
    <div className={`w-full p-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {children}
      </div>
    </div>
  );
});

ScrollContainer.displayName = 'ScrollContainer';
