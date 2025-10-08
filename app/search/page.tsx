"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useSearchAnime, useAnimeByTag } from '@/hooks/useAnimeData';
import { AnimeCard } from '@/components/shared/AnimeCard';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { LoadingSkeleton } from '@/components/shared/Loading';
import { Search, Tag, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const tag = searchParams.get('tag') || '';
  const page = parseInt(searchParams.get('page') || '0');
  const [isNavigating, setIsNavigating] = useState(false);

  // Use appropriate hook based on search type
  const searchResults = useSearchAnime(query, page);
  const tagResults = useAnimeByTag(tag, page);
  
  const { data, isLoading, error, refetch } = tag ? tagResults : searchResults;

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsNavigating(false);
  }, [page]);

  const navigateToPage = (newPage: number) => {
    setIsNavigating(true);
    const params = new URLSearchParams();
    if (tag) {
      params.set('tag', tag);
    } else if (query) {
      params.set('q', query);
    }
    params.set('page', newPage.toString());
    router.push(`/search?${params.toString()}`);
  };

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
            {tag ? (
              <>
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Tag className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold">
                    {tag}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">Browse by tag</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-300">
                    "{query}"
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">Search results</p>
                </div>
              </>
            )}
          </div>
          
          {data && data.results && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="font-medium text-white">{data.results.length}</span>
              <span>results found</span>
              {data.nbPages && data.nbPages > 1 && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>Page {page + 1} of {data.nbPages}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {(isLoading || isNavigating) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-pulse">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="animate-fadeIn">
            <ErrorMessage 
              message={error}
              onRetry={refetch}
            />
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && !error && !isNavigating && data?.results && data.results.length > 0 && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
              {data.results.map((anime, index) => (
                <div 
                  key={anime.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AnimeCard 
                    item={anime} 
                    priority={index < 5}
                  />
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {data.nbPages && data.nbPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-8">
                {/* Previous Button */}
                <button
                  onClick={() => navigateToPage(Math.max(0, page - 1))}
                  disabled={page === 0 || isNavigating}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:border-gray-800 group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {/* First page */}
                  {page > 2 && (
                    <>
                      <button
                        onClick={() => navigateToPage(0)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-all"
                      >
                        1
                      </button>
                      {page > 3 && <span className="text-gray-600">...</span>}
                    </>
                  )}

                  {/* Previous page */}
                  {page > 0 && (
                    <button
                      onClick={() => navigateToPage(page - 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-all"
                    >
                      {page}
                    </button>
                  )}

                  {/* Current page */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-black font-semibold">
                    {page + 1}
                  </div>

                  {/* Next page */}
                  {page < data.nbPages - 1 && (
                    <button
                      onClick={() => navigateToPage(page + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-all"
                    >
                      {page + 2}
                    </button>
                  )}

                  {/* Last page */}
                  {data.nbPages && page < data.nbPages - 3 && (
                    <>
                      {page < data.nbPages - 4 && <span className="text-gray-600">...</span>}
                      <button
                        onClick={() => navigateToPage(data.nbPages! - 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-all"
                      >
                        {data.nbPages}
                      </button>
                    </>
                  )}
                </div>
                
                {/* Next Button */}
                <button
                  onClick={() => navigateToPage(page + 1)}
                  disabled={page >= data.nbPages - 1 || isNavigating}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:border-gray-800 group"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && !isNavigating && data?.results && data.results.length === 0 && (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-900 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-700" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">No results found</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {tag 
                ? `No anime found with the tag "${tag}". Try browsing other categories.`
                : `No results for "${query}". Try different keywords or browse our collection.`
              }
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
