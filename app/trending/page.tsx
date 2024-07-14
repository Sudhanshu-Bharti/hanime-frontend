"use client"
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { DownloadIcon, EyeIcon, FlameIcon, HeartIcon, CalendarIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { BASE_URL } from '@/lib/utils'

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

interface DetailedTrendingItem extends TrendingItem {
    genres: string[];
    release_date: string;
}

const TrendingPage = () => {
    const [trending, setTrending] = useState<DetailedTrendingItem[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrending = async () => {
            const response = await fetch(`${BASE_URL}/getLanding/trending`);
            const data = await response.json();
            const trendingWithDetails = await Promise.all(data.results.map(async (item: TrendingItem) => {
                const detailResponse = await fetch(`${BASE_URL}/getInfo/${item.slug}`);
                const detailData = await detailResponse.json();
                // console.log(detailData);
                
                return { 
                    ...item, 
                    genres: detailData.tags || [],
                    release_date: detailData.info.released_date || 'Unknown'
                };
            }));
            setTrending(trendingWithDetails);
        };
        fetchTrending();
    }, []);

    const handleCardClick = (slug: string) => {
        window.location.href = `/info/${slug}`;
    };

    const allGenres = Array.from(new Set(trending.flatMap(item => item.genres)));

    const filteredTrending = selectedGenre
        ? trending.filter(item => item.genres.includes(selectedGenre))
        : trending;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Trending Anime
                </span>
            </h1>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button
                    onClick={() => setSelectedGenre(null)}
                    className={`px-4 py-2 rounded-full ${!selectedGenre ? 'bg-purple-600' : 'bg-gray-700'} hover:bg-purple-500 transition-colors`}
                >
                    All
                </button>
                {allGenres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-4 py-2 rounded-full ${selectedGenre === genre ? 'bg-purple-600' : 'bg-gray-700'} hover:bg-purple-500 transition-colors`}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {filteredTrending.map((item) => (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Card 
                            onClick={() => handleCardClick(item.slug)} 
                            className="relative overflow-hidden group cursor-pointer bg-gray-800 rounded-lg shadow-lg"
                        >
                            <img src={item.cover_url} alt={item.name} className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="text-xl font-bold truncate mb-1" title={item.name}>{item.name}</h3>
                                    <div className="text-sm opacity-75 truncate mb-2">{item.brand}</div>
                                    <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                                        <div className="flex items-center gap-1">
                                            <HeartIcon className="w-4 h-4 text-red-500" />
                                            <span>{item.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DownloadIcon className="w-4 h-4 text-blue-500" />
                                            <span>{item.downloads}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <EyeIcon className="w-4 h-4 text-green-500" />
                                            <span>{item.views}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm mb-2">
                                        <FlameIcon className="w-4 h-4 text-orange-500" />
                                        <span className="font-medium">Rank: {item.monthly_rank}</span>
                                    </div>
                                
                                    <div className="flex items-center gap-2 text-sm mb-2">
                                        <CalendarIcon className="w-4 h-4 text-purple-500" />
                                        <span>{item.release_date}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {item.genres.map(genre => (
                                            <span key={genre} className="bg-gray-700 text-xs px-2 py-1 rounded-full">
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default TrendingPage