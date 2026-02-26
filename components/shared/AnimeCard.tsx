import React from 'react';
import Link from 'next/link';
import { Eye, Heart, TrendingUp } from 'lucide-react';
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
    <div className="group">
      {/* Card/Image Container */}
      <div
        className={`relative aspect-[2/3] w-full overflow-hidden cursor-pointer rounded-xl border border-white/10 bg-black/30 transition-all duration-300 group-hover:border-white/20 ${className}`}
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
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={priority}
        />

        {/* Dim overlay */}
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/45" />

        {/* Rank badge */}
        {item.monthly_rank && item.monthly_rank <= 100 && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-xs font-semibold rounded flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            #{item.monthly_rank}
          </div>
        )}
      </div>

      {/* Info below card */}
      <div className="mt-3 space-y-2">
        <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2 leading-tight min-h-[2.5rem]" title={item.name}>
          {item.name}
        </h3>
        <div className="text-xs sm:text-sm text-gray-400 truncate h-4" title={item.brand ?? ''}>
          {item.brand ?? ''}
        </div>
        <div className="flex items-center gap-4 text-[11px] sm:text-sm text-gray-300 h-4">
          <div className="flex items-center gap-1.5" title={`${(item.views ?? 0).toLocaleString()} views`}>
            <Eye className="w-3.5 h-3.5" />
            <span>{formatNumber(item.views ?? 0)}</span>
          </div>
          {item.likes !== undefined && (
            <div className="flex items-center gap-1.5" title={`${item.likes.toLocaleString()} likes`}>
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
    <Link href={`/info/${item.slug}`} prefetch={false}>
      {content}
    </Link>
  );
});

AnimeCard.displayName = 'AnimeCard';
