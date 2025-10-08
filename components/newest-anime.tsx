"use client"
import React from 'react';
import Link from 'next/link';
import { useNewestAnime } from '@/hooks/useAnimeData';
import { useAnimeNavigation } from '@/hooks/useNavigation';
import { AnimeCard } from './shared/AnimeCard';
import { ScrollContainer } from './shared/ScrollContainer';
import { LoadingSkeleton } from './shared/Loading';
import { ErrorMessage } from './shared/ErrorMessage';

const NewestAnime = () => {
  const { items, isLoading, error, refetch } = useNewestAnime();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} showDetails={true} />;
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No newest anime available at the moment.</p>
      </div>
    );
  }

  return (
    <ScrollContainer>
      {items.map((item) => (
        <div key={item.id} className="aspect-[2/3] w-full">
          <AnimeCard item={item} className="h-full" />
        </div>
      ))}
      <Link href="/newest" className="flex items-center justify-center min-w-[120px]">
        <button 
          className="h-full px-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          aria-label="View more newest anime"
        >
          View More →
        </button>
      </Link>
    </ScrollContainer>
  );
};

export default React.memo(NewestAnime);