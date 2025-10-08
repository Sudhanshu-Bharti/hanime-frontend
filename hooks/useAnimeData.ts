import { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../lib/utils';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../lib/constants';
import type { AnimeItem, AnimeListResponse, Tag, TagsResponse, VideoData, Stream } from '../types';

interface UseFetchOptions {
  enabled?: boolean;
}

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Generic fetch hook for API calls
 */
export function useFetch<T>(
  endpoint: string,
  options: UseFetchOptions = { enabled: true }
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!options.enabled) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        // Provide more specific error messages based on status code
        if (response.status === 500) {
          throw new Error('Server error. The API is currently experiencing issues. Please try again later.');
        } else if (response.status === 404) {
          throw new Error('Content not found.');
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.FETCH_FAILED;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, options.enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

/**
 * Hook for fetching newest anime
 */
export function useNewestAnime() {
  const { data, isLoading, error, refetch } = useFetch<AnimeListResponse>(
    API_ENDPOINTS.LANDING.NEWEST
  );

  return {
    items: data?.results ?? [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook for fetching trending anime
 */
export function useTrendingAnime() {
  const { data, isLoading, error, refetch } = useFetch<AnimeListResponse>(
    API_ENDPOINTS.LANDING.TRENDING
  );
  console.log("Trending anime data:", data, "Error:", error);
  return {
    items: data?.results ?? [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook for fetching recent anime
 */
export function useRecentAnime() {
  const { data, isLoading, error, refetch } = useFetch<AnimeListResponse>(
    API_ENDPOINTS.LANDING.RECENT
  );

  return {
    items: data?.results ?? [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook for fetching browse tags
 */
export function useBrowseTags() {
  const { data, isLoading, error, refetch } = useFetch<TagsResponse>(
    API_ENDPOINTS.BROWSE
  );

  return {
    tags: data?.tags ?? [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook for fetching anime info by slug
 */
export function useAnimeInfo(slug: string) {
  return useFetch<any>(API_ENDPOINTS.INFO(slug), { enabled: !!slug });
}

/**
 * Hook for fetching video data by slug
 */
/**
 * Hook to fetch video data
 */
export function useVideoData(id: string | null) {
  return useFetch<VideoData>(
    id ? `${API_ENDPOINTS.VIDEO}${id}` : '',
    { enabled: !!id }
  );
}

/**
 * Hook to search anime
 */
export function useSearchAnime(query: string, page: number = 0) {
  return useFetch<AnimeListResponse>(
    query ? `${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}&page=${page}` : '',
    { enabled: !!query && query.trim().length > 0 }
  );
}

/**
 * Hook to filter anime by tag
 */
export function useAnimeByTag(tag: string, page: number = 0) {
  return useFetch<AnimeListResponse>(
    tag ? `${API_ENDPOINTS.BROWSE}?tag=${encodeURIComponent(tag)}&page=${page}` : '',
    { enabled: !!tag }
  );
}
