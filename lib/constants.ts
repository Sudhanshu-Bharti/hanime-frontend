// API Endpoints
export const API_ENDPOINTS = {
  LANDING: {
    NEWEST: '/getLanding/newest',
    TRENDING: '/getLanding/trending',
    RECENT: '/getLanding/recent',
  },
  BROWSE: '/browse',
  SEARCH: '/search',
  INFO: (slug: string) => `/getInfo/${slug}`,
  VIDEO: (slug: string) => `/getVideo/${slug}`,
  COMMUNITY: '/community_upload',
  PROXY_VIDEO: (url: string) => `/api/proxy-video?url=${encodeURIComponent(url)}`,
} as const;

// UI Constants
export const SCROLL_AMOUNT = 300;
export const SKELETON_COUNT = 5;

// Quality Settings
export const VIDEO_QUALITIES = ['1080p', '720p', '480p', '360p'] as const;

// Animation Durations
export const ANIMATION = {
  CARD_HOVER_SCALE: 1.05,
  TRANSITION_DURATION: 300,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to load data. Please try again later.',
  VIDEO_LOAD_FAILED: 'Failed to load video. Please try again.',
  NO_STREAMS: 'No video streams available.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
} as const;

// Format helpers
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const formatFileSize = (bytes: number): string => {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Validation helpers
export const isValidUrl = (urlString: string): boolean => {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

// Sorting helpers
export const sortByQuality = (a: { height: string }, b: { height: string }) => {
  return parseInt(b.height) - parseInt(a.height);
};
