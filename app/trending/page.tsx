"use client"
import React, { useEffect, useState, useMemo } from 'react'
import { EyeIcon, CalendarIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BASE_URL } from '@/lib/utils'
import { PageLayout } from '@/components/shared/PageLayout'
import { SimpleImage } from '@/components/shared/OptimizedImage'

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
        <PageLayout containerClassName="pt-4 sm:pt-6 md:pt-8">

            {/* Header Section */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white font-display">
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
                        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${!selectedGenre ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-white/10 text-gray-300 hover:bg-white/15'}`}
                    >
                        All
                    </button>
                    {allGenres.slice(0, 8).map(genre => (
                        <button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${selectedGenre === genre ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-white/10 text-gray-300 hover:bg-white/15'}`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Section */}
            {isLoading ? (
                <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 sm:pb-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 md:gap-6">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-[150px] sm:w-full aspect-[2/3] rounded-xl bg-gray-800 animate-pulse snap-start" />
                    ))}
                </div>
            ) : (
                <motion.div
                    className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 sm:pb-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4 md:gap-6"
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
                                className="cursor-pointer group w-[150px] sm:w-full snap-start"
                                onClick={() => handleCardClick(item.slug)}
                            >
                                {/* Card Container */}
                                <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-md transition-all duration-300 border border-white/10 bg-black/30">
                                    <SimpleImage
                                        src={item.cover_url}
                                        alt={item.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/45" />
                                </div>

                                {/* Details below card */}
                                <div className="mt-3 space-y-2">
                                    <h3 className="text-sm md:text-base font-semibold text-white leading-tight line-clamp-2 min-h-[2.5rem]">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-[11px] md:text-xs text-gray-300 h-4">
                                        <div className="flex items-center gap-1" title={`${item.views.toLocaleString()} views`}>
                                            <EyeIcon className="w-3.5 h-3.5 text-blue-400" />
                                            {formatNumber(item.views)}
                                        </div>
                                        {item.released_at && (
                                            <div className="flex items-center gap-1">
                                                <CalendarIcon className="w-3.5 h-3.5" />
                                                {formatDate(item.released_at)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Genre Tags */}
                                    <div className="min-h-[22px]">
                                        {item.genres.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.genres.slice(0, 2).map(genre => (
                                                    <span
                                                        key={genre}
                                                        className="bg-white/10 text-gray-200 text-[10px] px-2 py-0.5 rounded-full"
                                                    >
                                                        {genre}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </PageLayout>
    )
}

export default TrendingPage
