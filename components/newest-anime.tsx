"use client"
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon, EyeIcon, FlameIcon, HeartIcon } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react'
import { Card } from './ui/card';
import { BASE_URL } from '@/lib/utils';

interface NewestItem {
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

interface NewestData {
    results: NewestItem[];
}

const NewestAnime = () => {
    const [newestData, setNewestData] = useState<NewestItem[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchNewest = async () => {
            const response = await fetch(`${BASE_URL}/getLanding/newest`);
            const data: NewestData = await response.json();
            setNewestData(data.results);
        };
        fetchNewest();
    }, []);

    const handleCardClick = async (slug: string) => {
        try {
            const response = await fetch(`${BASE_URL}/getInfo/${slug}`);
            if (!response.ok) {
                throw new Error('Failed to fetch info');
            }
            const infoData = await response.json();
            localStorage.setItem('currentItemInfo', JSON.stringify(infoData));
            window.location.href = `/info/${slug}`;
        } catch (error) {
            console.error('Error fetching info:', error);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full py-8 bg-gray-900 ">
            <div className="flex items-center">
                <button 
                    onClick={() => scroll('left')} 
                    className="absolute left-2 z-10 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 transition-colors"
                >
                    <ArrowLeftIcon size={24} />
                </button>
                <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4 pb-4 px-4 scrollbar-hide">
                    {newestData.map((item) => (
                        <Card key={item.id} onClick={() => handleCardClick(item.slug)} className="flex-none w-64 h-96 relative overflow-hidden group">
                            <img src={item.cover_url} alt={item.name} className="w-full h-full object-cover" />
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
                    <div className="flex-none w-64 h-96 flex items-center justify-center">
                        <button 
                            onClick={() => {/* Handle More click */}} 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
                        >
                            MORE
                        </button>
                    </div>
                </div>
                <button 
                    onClick={() => scroll('right')} 
                    className="absolute right-2 z-10 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 transition-colors"
                >
                    <ArrowRightIcon size={24} />
                </button>
            </div>
        </div>
    )
}

export default NewestAnime