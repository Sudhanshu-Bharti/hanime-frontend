"use client";
import { useNewestAnime } from '@/hooks/useAnimeData';
import { AnimeCard } from '@/components/shared/AnimeCard';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { GridLoadingSkeleton } from '@/components/shared/Loading';
import { PageLayout } from '@/components/shared/PageLayout';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewestPage() {
  const { items, isLoading, error, refetch } = useNewestAnime();

  return (
    <PageLayout>
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gray-800 rounded-lg">
              <Calendar className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-display">
                New This Week
              </h1>
              <p className="text-sm text-gray-500 mt-1">Freshly added to our collection</p>
            </div>
          </div>
          
          {items && items.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="font-medium text-white">{items.length}</span>
              <span>items found</span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && <GridLoadingSkeleton count={20} />}

        {/* Error State */}
        {error && !isLoading && (
          <div className="animate-fadeIn">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && !error && items && items.length > 0 && (
          <div className="animate-fadeIn">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 sm:pb-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
              {items.map((anime, index) => (
                <div 
                  key={anime.id}
                  className="animate-slideUp aspect-[2/3] w-[150px] sm:w-full snap-start"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AnimeCard item={anime} priority={index < 5} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && (!items || items.length === 0) && (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-900 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-gray-700" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">No new anime found</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Check back later for freshly added content.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        )}
    </PageLayout>
  );
}
