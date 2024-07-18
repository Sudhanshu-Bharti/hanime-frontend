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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-6 md:p-8">
            <h1 className="mt-4 sm:mt-8 text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Trending Anime
                </span>
            </h1>

            <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
                <button
                    onClick={() => setSelectedGenre(null)}
                    className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full ${!selectedGenre ? 'bg-purple-600' : 'bg-gray-700'} hover:bg-purple-500 transition-colors`}
                >
                    All
                </button>
                {allGenres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full ${selectedGenre === genre ? 'bg-purple-600' : 'bg-gray-700'} hover:bg-purple-500 transition-colors`}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {filteredTrending.map((item) => (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card 
                            onClick={() => handleCardClick(item.slug)} 
                            className="relative w-full h-auto  overflow-hidden group cursor-pointer bg-gray-800 rounded-lg shadow-lg"
                        >
                            <img src={item.cover_url} alt={item.name} className="w-full h-56  sm:h-80 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                                    <h3 className="text-lg sm:text-xl font-bold truncate mb-1" title={item.name}>{item.name}</h3>
                                    <div className="text-xs sm:text-sm opacity-75 truncate mb-2">{item.brand}</div>
                                    <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm mb-2">
                                        <div className="flex items-center gap-1">
                                            <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                                            <span>{item.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DownloadIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                                            <span>{item.downloads}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                                            <span>{item.views}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm mb-2">
                                        <FlameIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                                        <span className="font-medium">Rank: {item.monthly_rank}</span>
                                    </div>
                                
                                    <div className="flex items-center gap-2 text-xs sm:text-sm mb-2">
                                        <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                                        <span>{item.release_date}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {item.genres.slice(0, 3).map(genre => (
                                            <span key={genre} className="bg-gray-700 text-xs px-2 py-1 rounded-full">
                                                {genre}
                                            </span>
                                        ))}
                                        {item.genres.length > 3 && (
                                            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">
                                                +{item.genres.length - 3}
                                            </span>
                                        )}
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