"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { useBrowseTags, useAnimeByTag } from '@/hooks/useAnimeData';
import { LoadingSpinner } from '@/components/shared/Loading';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { AnimeCard } from '@/components/shared/AnimeCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BrowseSection: React.FC = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');

  const { tags, isLoading: tagsLoading, error: tagsError, refetch: refetchTags } = useBrowseTags();
  const { data: tagResults, isLoading: resultsLoading, error: resultsError, refetch: refetchResults } 
    = useAnimeByTag(tag || '', 0);

  const isLoading = tagsLoading || (tag && resultsLoading);
  const error = tagsError || (tag && resultsError);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      {tag ? (
        <div className="max-w-7xl mx-auto">
          {/* Back button and title */}
          <div className="mb-8">
            <Link 
              href="/browse"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Browse
            </Link>
            <h1 className="text-3xl font-bold text-white">Results for: {tag}</h1>
          </div>

          {/* Loading State or Error */}
          {isLoading ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <LoadingSpinner className="w-12 h-12" />
            </div>
          ) : error ? (
            <ErrorMessage message={error} onRetry={tag ? refetchResults : refetchTags} />
          ) : (
            /* Grid of anime cards */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tagResults?.results?.map((anime) => (
                <div key={anime.id} className="aspect-[2/3]">
                  <AnimeCard item={anime} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h1 className="mt-8 text-4xl font-bold mb-8 text-center text-purple-400">Browse Anime</h1>

          {isLoading ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <LoadingSpinner className="w-12 h-12" />
            </div>
          ) : error ? (
            <ErrorMessage message={error} onRetry={refetchTags} />
          ) : tags.length === 0 ? (
            <p className="text-center text-lg">No tags available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tags.map((tag) => (
                <Link 
                  key={tag.id}
                  href={`/browse?tag=${encodeURIComponent(tag.text)}`}
                  className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <OptimizedImage
                      src={tag.wide_image_url}
                      alt={`${tag.text} category`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" aria-hidden="true"></div>
                    <h2 className="absolute bottom-4 left-4 text-2xl font-bold">{tag.text}</h2>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-300 mb-2">{tag.description}</p>
                    <p className="text-sm text-purple-400">{tag.count} anime</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(BrowseSection);