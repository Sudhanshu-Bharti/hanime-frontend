import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { BASE_URL } from '../lib/utils';
import { API_ENDPOINTS } from '../lib/constants';

/**
 * Hook for navigating to anime detail pages
 */
export function useAnimeNavigation() {
  const router = useRouter();

  const navigateToAnime = useCallback(
    async (slug: string) => {
      try {
        // Navigate directly using Next.js router
        // No need to fetch and store in localStorage
        router.push(`/info/${slug}`);
      } catch (error) {
        console.error('Error navigating to anime:', error);
      }
    },
    [router]
  );

  return { navigateToAnime };
}
