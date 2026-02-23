"use client";
import Browse from '@/components/browse';
import Recent from '@/components/recent';
import NewestAnime from '@/components/newest-anime';
import Trending from '@/components/trending';
import {
  Search,
  ChevronRight,
  Sparkles,
  Flame,
  Star
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendUp, Filter, Play, Timer1, Category2, Star1, MagicStar } from 'iconsax-reactjs';

// Custom Icon Components for a more unique look
const CustomIcon = {
  Trending: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  NewReleases: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const router = useRouter();

  const quickFilters = [
    { id: 'all', label: 'All', icon: <Filter className="w-4 h-4" /> },
    { id: 'new', label: 'New', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'trending', label: 'Hot', icon: <Flame className="w-4 h-4" /> },
    { id: 'popular', label: 'Top', icon: <MagicStar className="w-4 h-4" variant="Bold" /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* Hero Section - Responsive Optimization */}
      <section className="relative h-[85vh] sm:h-[90vh] min-h-[600px] sm:min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/rias.png"
            alt="Featured Content"
            className="w-full h-full object-cover object-top sm:object-center"
          />
          {/* Advanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

          {/* Animated Glow Effect */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl space-y-4 sm:space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="space-y-3 sm:space-y-5" variants={itemVariants}>
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.span
                  className="px-2.5 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r from-red-600 to-pink-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-red-500/20 flex items-center gap-1.5 sm:gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Premium 4K
                </motion.span>
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] sm:text-xs font-medium rounded-full">
                  2025 • 18+
                </span>
              </div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none tracking-tighter"
                variants={itemVariants}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Hanime
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Hub
                </span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg border-l-2 border-purple-500 pl-4"
                variants={itemVariants}
              >
                Stream premium anime content in HD quality. No ads, no interruptions,
                just pure entertainment.
              </motion.p>
            </motion.div>

            <motion.div className="flex flex-wrap gap-3 sm:gap-4 pt-0 sm:pt-4" variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-auto">
                <Link
                  href="/browse"
                  className="group flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl shadow-white/10"
                >
                  <div className="bg-black rounded-full p-1 sm:p-1.5 group-hover:rotate-[15deg] transition-transform">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-white text-white" />
                  </div>
                  <span className="text-sm sm:text-base">Browse Now</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-auto">
                <Link
                  href="/trending"
                  className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  <span className="text-sm sm:text-base">Trending</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters Bar */}
      <motion.div
        className="relative z-20 px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-5xl mx-auto bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-3 sm:p-4">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between">

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full md:flex-1">
              <div className="relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search titles, genres..."
                  className="w-full py-2.5 sm:py-3.5 pl-10 sm:pl-12 pr-4 bg-black/60 border border-gray-700/50 text-white placeholder-gray-500 rounded-lg sm:rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                />
                {searchQuery && (
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 sm:px-4 sm:py-1.5 bg-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-purple-500 transition-colors"
                  >
                    Search
                  </button>
                )}
              </div>
            </form>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-0.5 md:pb-0 hide-scrollbar">
              {quickFilters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl whitespace-nowrap text-xs sm:text-sm font-medium transition-all duration-200 ${selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-black/30 text-gray-400 hover:bg-black/50 hover:text-white border border-gray-700/50'
                    }`}
                >
                  {filter.icon}
                  <span>{filter.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="p-4 border-b border-gray-800">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Navigation
                  </h3>
                </div>
                <nav className="p-2 space-y-1">
                  {[
                    { href: '/browse', icon: Category2, label: 'Browse All', color: 'text-blue-400' },
                    { href: '/trending', icon: TrendUp, label: 'Trending', color: 'text-pink-400' },
                    { href: '/community', icon: Star1, label: 'Community', color: 'text-yellow-400' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors group"
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-600" />
                    </Link>
                  ))}
                </nav>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="p-4 border-b border-gray-800">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Categories
                  </h3>
                </div>
                <div className="p-4">
                  <Browse />
                </div>
              </motion.div>
            </div>
          </aside>

          {/* Main Feed */}
          <div className="flex-1 space-y-10 sm:space-y-16">
            <ContentSection
              title="Recent Releases"
              subtitle="Fresh out the oven"
              icon={<Timer1 className="w-5 h-5 text-blue-400" variant="Bold" />}
              viewAllLink="/recent"
              delay={0.2}
            >
              <Recent />
            </ContentSection>

            <ContentSection
              title="New This Week"
              subtitle="Just added"
              icon={<CustomIcon.NewReleases />}
              viewAllLink="/newest"
              delay={0.4}
            >
              <NewestAnime />
            </ContentSection>

            <ContentSection
              title="Trending Now"
              subtitle="Fan favorites"
              icon={<TrendUp className="w-5 h-5 text-orange-400" />}
              viewAllLink="/trending"
              delay={0.6}
            >
              <Trending />
            </ContentSection>

            <ContentSection
              title="Top Rated"
              subtitle="Hall of fame"
              icon={<Star className="w-5 h-5 text-yellow-400" />}
              viewAllLink="/browse?sort=rating"
              delay={0.8}
            >
              <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 sm:p-12 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(107,33,168,0.15),transparent_70%)]" />
                <div className="relative z-10">
                  <Star className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Coming Soon</h3>
                  <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
                    Curated top-rated lists are on their way.
                  </p>
                </div>
              </div>
            </ContentSection>
          </div>
        </div>
      </div>

      {/* Mobile Category Menu */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-5 sm:p-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
            Browse Categories
          </h3>
          <Browse />
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}

function ContentSection({
  title,
  subtitle,
  icon,
  viewAllLink,
  delay = 0,
  children
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  viewAllLink?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      className="space-y-4 sm:space-y-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-white/5 p-1.5 sm:p-2.5 rounded-lg border border-gray-800">
            {icon}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="flex items-center gap-1 text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors font-medium group"
          >
            View All
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
      <div className="relative">
        {children}
      </div>
    </motion.section>
  );
}