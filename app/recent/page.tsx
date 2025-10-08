"use client";
import { useRecentAnime } from '@/hooks/useAnimeData';
import { AnimeCard } from '@/components/shared/AnimeCard';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { GridLoadingSkeleton } from '@/components/shared/Loading';
import { Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RecentPage() {
  const { items, isLoading, error, refetch } = useRecentAnime();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Recent Releases
              </h1>
              <p className="text-sm text-gray-500 mt-1">Latest episodes and new series</p>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((anime, index) => (
                <div 
                  key={anime.id}
                  className="animate-slideUp"
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
              <Clock className="w-10 h-10 text-gray-700" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">No recent releases found</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Check back later for new episodes and series.
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
      </div>
    </main>
  );
}
