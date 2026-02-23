// Core Anime Types
export interface AnimeItem {
  id: number;
  cover_url: string;
  name: string;
  brand?: string;
  likes?: number;
  downloads?: number;
  views: number;
  monthly_rank?: number;
  slug: string;
  tags?: string[];
}

export interface Tag {
  count: number;
  description: string;
  id: number;
  tall_image_url: string;
  text: string;
  wide_image_url: string;
}

export interface Stream {
  height: string;
  url: string;
  is_guest_allowed: boolean;
}

export interface VideoData {
  streams: Stream[];
  title: string;
  poster_url: string;
}

export interface AnimeInfo {
  title: string;
  poster: string;
  released_at: string;
  views: number;
  downloads: number;
  streams: number;
  description: string;
  tags: string[];
  brand: string;
}

// API Response Types
export interface AnimeListResponse {
  page?: number;
  nbPages?: number;
  results: AnimeItem[];
}

export interface TagsResponse {
  tags: Tag[];
}

export interface CommunityUpload {
  canonical_url: string;
  channel_name: string;
  discord_user_id: number;
  extension: string;
  filesize: number;
  height: number;
  id: number;
  proxy_url: string;
  url: string;
  user_avatar_url: string;
  username: string;
  width: number;
}

// Component Props Types
export interface PageParams {
  slug: string;
}

export interface PageProps {
  params: PageParams;
}

// Navigation Types
export type ScrollDirection = 'left' | 'right';

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
