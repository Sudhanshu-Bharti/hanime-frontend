import React from 'react';
import Link from 'next/link';
import { Play, Eye, Heart, TrendingUp } from 'lucide-react';
import { formatNumber } from '../../lib/constants';
import type { AnimeItem } from '../../types';
import { OptimizedImage } from './OptimizedImage';

interface AnimeCardProps {
  item: AnimeItem;
  onClick?: (slug: string) => void;
  className?: string;
  priority?: boolean;
}

export const AnimeCard = React.memo<AnimeCardProps>(({ item, onClick, className = '', priority = false }) => {
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(item.slug);
    }
  };

  const content = (
    <div className="flex flex-col gap-2">
      {/* Card/Image Container */}
      <div
        className={`group relative aspect-[2/3] w-full overflow-hidden cursor-pointer ${className}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick(e);
          }
        }}
        aria-label={`View ${item.name}`}
      >
        <OptimizedImage
          src={item.cover_url}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />

        {/* Simple hover overlay */}
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/30 transition-all duration-300" />

        {/* Play button on hover */}
        <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
            <Play className="w-6 h-6 text-black fill-black ml-0.5" />
          </div>
        </div>

        {/* Rank badge - always visible if ranked */}
        {item.monthly_rank && item.monthly_rank <= 100 && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-xs font-semibold rounded">
            #{item.monthly_rank}
          </div>
        )}
      </div>

      {/* Content below card */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-white line-clamp-2 leading-tight hover:text-gray-300 transition-colors">
          {item.name}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-1" title={`${(item.views ?? 0).toLocaleString()} views`}>
            <Eye className="w-3.5 h-3.5" />
            <span>{formatNumber(item.views ?? 0)}</span>
          </div>
          {item.likes !== undefined && (
            <div className="flex items-center gap-1" title={`${item.likes.toLocaleString()} likes`}>
              <Heart className="w-3.5 h-3.5" />
              <span>{formatNumber(item.likes)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return onClick ? (
    <div onClick={handleClick}>{content}</div>
  ) : (
    <Link href={`/info/${item.slug}`}>
      {content}
    </Link>
  );
});

AnimeCard.displayName = 'AnimeCard';
