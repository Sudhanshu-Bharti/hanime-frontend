"use client"
import React, { useEffect, useState, useMemo } from 'react'
import { EyeIcon, CalendarIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BASE_URL } from '@/lib/utils'

// Interface matching the provided JSON structure
interface TrendingItem {
    id: number;
    cover_url: string;
    name: string;
    views: number;
    slug: string;
    created_at: string;
    created_at_unix: number;
    released_at: string;
    released_at_unix: number;
}

interface DetailedTrendingItem extends TrendingItem {
    genres: string[];
}

const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const TrendingPage = () => {
    const [trending, setTrending] = useState<DetailedTrendingItem[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/getLanding/trending`);
                const data = await response.json();

                const trendingWithDetails = await Promise.all(data.results.map(async (item: TrendingItem) => {
                    try {
                        const detailResponse = await fetch(`${BASE_URL}/getInfo/${item.slug}`);
                        const detailData = await detailResponse.json();
                        return { ...item, genres: detailData.tags || [] };
                    } catch {
                        return { ...item, genres: [] };
                    }
                }));
                setTrending(trendingWithDetails);
            } catch (error) {
                console.error("Failed to fetch trending data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTrending();
    }, []);

    const handleCardClick = (slug: string) => {
        window.location.href = `/info/${slug}`;
    };

    const allGenres = useMemo(() => {
        return Array.from(new Set(trending.flatMap(item => item.genres || [])));
    }, [trending]);

    const filteredTrending = useMemo(() => {
        return selectedGenre
            ? trending.filter(item => item.genres?.includes(selectedGenre))
            : trending;
    }, [trending, selectedGenre]);

    return (
        <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-6 md:p-8 pt-20">

            {/* Header Section */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Trending Now
                    </h1>
                    <p className="text-gray-400 mt-1">
                        The most popular anime right now
                    </p>
                </div>

                {/* Genre Filter Pills */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedGenre(null)}
                        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${!selectedGenre ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        All
                    </button>
                    {allGenres.slice(0, 8).map(genre => (
                        <button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${selectedGenre === genre ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Section */}
            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-full aspect-[2/3] rounded-xl bg-gray-800 animate-pulse" />
                    ))}
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
                    layout
                >
                    <AnimatePresence>
                        {filteredTrending.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="cursor-pointer group"
                                onClick={() => handleCardClick(item.slug)}
                            >
                                {/* Card Container */}
                                <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-700 group-hover:border-purple-500">

                                    {/* Image - Absolute for perfect fit */}
                                    <img
                                        src={item.cover_url}
                                        alt={item.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-3 flex flex-col justify-end">

                                        {/* Top Stats Badge */}
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
                                            <EyeIcon className="w-3 h-3 text-blue-400" />
                                            {formatNumber(item.views)}
                                        </div>

                                        {/* Bottom Info */}
                                        <h3 className="text-sm md:text-base font-bold text-white leading-tight line-clamp-2 mb-1 drop-shadow-md">
                                            {item.name}
                                        </h3>

                                        <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-300 mb-2">
                                            {item.released_at && (
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="w-3 h-3" />
                                                    {formatDate(item.released_at)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Genre Tags */}
                                        <div className="flex flex-wrap gap-1">
                                            {item.genres.slice(0, 2).map(genre => (
                                                <span
                                                    key={genre}
                                                    className="bg-gray-900/70 backdrop-blur-sm text-gray-200 text-[10px] px-1.5 py-0.5 rounded"
                                                >
                                                    {genre}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    )
}

export default TrendingPage