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

// Simple in-memory cache to prevent redundant fetches
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

/**
 * Generic fetch hook for API calls with caching
 */
export function useFetch<T>(
  endpoint: string,
  options: UseFetchOptions = { enabled: true }
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(() => {
    if (!endpoint) return null;
    const cached = cache.get(endpoint);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data as T;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!options.enabled || !endpoint) return;

    // Check cache if not forcing refresh
    if (!forceRefresh) {
      const cached = cache.get(endpoint);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setData(cached.data as T);
        setIsLoading(false);
        return;
      }
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}${endpoint}`);

      if (!response.ok) {
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

      // Update cache
      cache.set(endpoint, { data: result, timestamp: Date.now() });

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

  return { data, isLoading, error, refetch: () => fetchData(true) };
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
