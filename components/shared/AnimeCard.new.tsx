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

  const cardContent = (
    <div 
      className={`group ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e);
        }
      }}
      aria-label={`View ${item.name}`}
    >
      {/* Card */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden">
        <div className="relative aspect-[2/3] w-full">
          <OptimizedImage
            src={item.cover_url}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={priority}
          />
          
          {/* Simple play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-8 h-8 text-black fill-black ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Info below card */}
      <div className="mt-3 space-y-2">
        <h3 className="font-medium text-base text-white line-clamp-2" title={item.name}>
          {item.name}
        </h3>
        <div className="text-sm text-gray-400">{item.brand}</div>
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-1.5" title={`${item.views.toLocaleString()} views`}>
            <Eye className="w-4 h-4" />
            <span>{formatNumber(item.views)}</span>
          </div>
          <div className="flex items-center gap-1.5" title={`${item.likes.toLocaleString()} likes`}>
            <Heart className="w-4 h-4" />
            <span>{formatNumber(item.likes)}</span>
          </div>
          {item.monthly_rank && (
            <div className="flex items-center gap-1.5 text-yellow-500" title={`Rank #${item.monthly_rank}`}>
              <TrendingUp className="w-4 h-4" />
              <span>#{item.monthly_rank}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return onClick ? (
    <div onClick={handleClick}>{cardContent}</div>
  ) : (
    <Link href={`/info/${item.slug}`}>{cardContent}</Link>
  );
});

AnimeCard.displayName = 'AnimeCard';