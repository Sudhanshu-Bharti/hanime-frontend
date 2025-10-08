"use client"
import React from 'react';
import { useTrendingAnime } from '@/hooks/useAnimeData';
import { useAnimeNavigation } from '@/hooks/useNavigation';
import { AnimeCard } from './shared/AnimeCard';
import { ScrollContainer } from './shared/ScrollContainer';
import { LoadingSkeleton } from './shared/Loading';
import { ErrorMessage } from './shared/ErrorMessage';

const Trending = () => {
  const { items, isLoading, error, refetch } = useTrendingAnime();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} showDetails={true} />;
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No trending anime available at the moment.</p>
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
    </ScrollContainer>
  );
};

export default React.memo(Trending);