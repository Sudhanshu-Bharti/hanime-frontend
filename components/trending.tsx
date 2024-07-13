"use client"
import { DownloadIcon, EyeIcon, FlameIcon, HeartIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Card } from './ui/card';

interface TrendingItem {
    id: number;
    cover_url: string;
    name: string;
    brand: string;
    likes: number;
    downloads: number;
    views: number;
    monthly_rank: number;
    slug: string;
  }

interface TrendingData {
results: TrendingItem[];
}
const Trending = () => {
    const [trendingData, setTrendingData] = useState<TrendingItem[]>([]);
    useEffect(() => {
        const fetchNewest = async () => {
            const response = await fetch('http://127.0.0.1:8080/getLanding/trending');
            const data : TrendingData = await response.json();
            setTrendingData(data.results);
        };
        fetchNewest();
    }, []);

    const handleCardClick = async (slug: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/getInfo/${slug}`);
            if (!response.ok) {
                throw new Error('Failed to fetch info');
            }
            const infoData = await response.json();
            
            localStorage.setItem('currentItemInfo', JSON.stringify(infoData));
            
           
            window.location.href = `/info/${slug}`;           
          }
            
        catch (error) {
            console.error('Error fetching info:', error);
        }
    };
    
  return (
      <div className="w-full overflow-x-auto">
            <div className="flex flex-row space-x-4 pb-4">
            {trendingData.map((item) => (
                <Card key={item.id} onClick={() => handleCardClick(item.slug)} className="flex-none w-64 h-96 relative overflow-hidden group">
                    {/* <img src={item.cover_url}  alt={item.name} className="w-full h-full object-cover" /> */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 transition-opacity group-hover:opacity-100 opacity-0">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="text-lg font-bold truncate mb-1" title={item.name}>
                                {item.name}
                            </h3>
                            <div className="text-sm opacity-75 truncate mb-2">{item.brand}</div>
                            <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                                <div className="flex items-center gap-1">
                                    <HeartIcon className="w-4 h-4" />
                                    <span>{item.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <DownloadIcon className="w-4 h-4" />
                                    <span>{item.downloads}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <EyeIcon className="w-4 h-4" />
                                    <span>{item.views}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <FlameIcon className="w-4 h-4" />
                                <span className="font-medium">Rank: {item.monthly_rank}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
          </div>
        </div>
    )
}

export default Trending