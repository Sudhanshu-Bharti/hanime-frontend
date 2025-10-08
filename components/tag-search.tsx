import React from 'react';
import { useAnimeByTag } from '@/hooks/useAnimeData';
import { AnimeCard } from './shared/AnimeCard';
import { LoadingSkeleton } from './shared/Loading';
import { ErrorMessage } from './shared/ErrorMessage';

interface TagSearchProps {
  tag: string;
}

const TagSearch: React.FC<TagSearchProps> = ({ tag }) => {
  const { data, isLoading, error, refetch } = useAnimeByTag(tag, 0);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!data?.results || data.results.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No anime found for tag: {tag}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.results.map((item) => (
        <div key={item.id} className="aspect-[2/3]">
          <AnimeCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default TagSearch;